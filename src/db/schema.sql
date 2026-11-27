-- ==============================================================================
-- ZYNOCS ENTERPRISE DATABASE SCHEMA (PostgreSQL 18)
-- Database: zynocs_enterprise
-- Port: 8800
-- ==============================================================================

-- 1. Users Master Table (Central Identity)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Multi-Subdomain Role Memberships
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subdomain VARCHAR(50) NOT NULL, -- 'directors', 'work', 'client', 'sponsors', 'ads', 'main'
    role VARCHAR(50) NOT NULL,      -- 'DIRECTOR', 'CHAIRPERSON', 'CEO', 'ENGINEER', 'PM', 'CLIENT', 'SPONSOR', 'ADOPS'
    department VARCHAR(100),        -- 'Executive Board', 'Architecture', 'AdOps', 'Client'
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'REVOKED', 'SUSPENDED'
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    UNIQUE(user_id, subdomain, role)
);

-- 3. Contact Inquiries Table (zynocs.com/contact)
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(150),
    service_domain VARCHAR(100) NOT NULL,
    budget_scope VARCHAR(50) NOT NULL,
    timeline VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    nda_requested BOOLEAN DEFAULT TRUE,
    status VARCHAR(30) DEFAULT 'TRIAGE_QUEUED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enterprise Client Projects (client.zynocs.com)
CREATE TABLE IF NOT EXISTS client_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id VARCHAR(50) UNIQUE NOT NULL,
    client_user_id UUID REFERENCES users(id),
    project_name VARCHAR(200) NOT NULL,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    staging_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Sponsor Campaigns (sponsors.zynocs.com)
CREATE TABLE IF NOT EXISTS sponsor_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sponsor_user_id UUID REFERENCES users(id),
    campaign_name VARCHAR(200) NOT NULL,
    budget_usd NUMERIC(10, 2) NOT NULL,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INITIAL FOUNDER & SEED DATA
-- ==============================================================================

INSERT INTO users (id, email, password_hash, full_name, is_2fa_enabled)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'mohammedkhaja@zynocs.com', '$2b$10$9XJSAMgLuyIj.iNDJV16S.DOmWWSA0qhZ02IJYUuF7i0/L1P0Jn9q', 'Mohammed Khaja Moinuddin', TRUE)
ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash, full_name = EXCLUDED.full_name;

-- Assign Full Enterprise Subdomain Permissions
INSERT INTO user_roles (user_id, subdomain, role, department, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'directors', 'CHAIRPERSON_FOUNDER', 'Executive Board', 'ACTIVE'),
    ('11111111-1111-1111-1111-111111111111', 'work', 'DIRECTOR', 'Executive Board', 'ACTIVE'),
    ('11111111-1111-1111-1111-111111111111', 'main', 'SUPER_ADMIN', 'Central Identity', 'ACTIVE'),
    ('11111111-1111-1111-1111-111111111111', 'client', 'CLIENT_ENTERPRISE_EXECUTIVE', 'Executive Board', 'ACTIVE'),
    ('11111111-1111-1111-1111-111111111111', 'sponsors', 'SPONSOR_DIRECTOR', 'Executive Board', 'ACTIVE'),
    ('11111111-1111-1111-1111-111111111111', 'ads', 'ADOPS_OPERATOR', 'Executive Board', 'ACTIVE')
ON CONFLICT (user_id, subdomain, role) DO UPDATE SET status = 'ACTIVE';
