-- Add missing Directus system columns to train_template_themes
ALTER TABLE train_template_themes 
ADD COLUMN IF NOT EXISTS status VARCHAR(255) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS sort INTEGER,
ADD COLUMN IF NOT EXISTS user_created UUID REFERENCES directus_users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS user_updated UUID REFERENCES directus_users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_theme INTEGER REFERENCES train_template_themes(id) ON DELETE SET NULL;

-- Update name column from theme_name if it exists
UPDATE train_template_themes SET name = theme_name WHERE name IS NULL AND theme_name IS NOT NULL;

-- Update sort column from sort_order if it exists
UPDATE train_template_themes SET sort = sort_order WHERE sort IS NULL AND sort_order IS NOT NULL;

-- Add missing Directus system columns to worksheet_template_themes
ALTER TABLE worksheet_template_themes 
ADD COLUMN IF NOT EXISTS status VARCHAR(255) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS sort INTEGER,
ADD COLUMN IF NOT EXISTS user_created UUID REFERENCES directus_users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS user_updated UUID REFERENCES directus_users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_theme INTEGER REFERENCES worksheet_template_themes(id) ON DELETE SET NULL;

-- Update name column from theme_name if it exists
UPDATE worksheet_template_themes SET name = theme_name WHERE name IS NULL AND theme_name IS NOT NULL;

-- Update sort column from sort_order if it exists
UPDATE worksheet_template_themes SET sort = sort_order WHERE sort IS NULL AND sort_order IS NOT NULL;

-- Set proper names if they're still NULL
UPDATE train_template_themes SET name = 'Classic Train' WHERE id = 1 AND name IS NULL;
UPDATE worksheet_template_themes SET name = 'Basic Worksheet' WHERE id = 1 AND name IS NULL;
UPDATE worksheet_template_themes SET name = 'Winter' WHERE id = 2 AND name IS NULL;