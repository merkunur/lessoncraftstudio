-- Add missing Directus system columns to train_template_themes
ALTER TABLE train_template_themes 
ADD COLUMN IF NOT EXISTS status VARCHAR(255) DEFAULT 'published',
ADD COLUMN IF NOT EXISTS sort INTEGER,
ADD COLUMN IF NOT EXISTS user_created UUID,
ADD COLUMN IF NOT EXISTS date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS user_updated UUID,
ADD COLUMN IF NOT EXISTS date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_theme INTEGER;

-- Update name from theme_name if needed
UPDATE train_template_themes SET name = theme_name WHERE name IS NULL AND theme_name IS NOT NULL;
UPDATE train_template_themes SET name = 'Classic Train' WHERE name IS NULL;

-- Update sort from sort_order if needed
UPDATE train_template_themes SET sort = sort_order WHERE sort IS NULL AND sort_order IS NOT NULL;

-- Add missing Directus system columns to worksheet_template_themes  
ALTER TABLE worksheet_template_themes 
ADD COLUMN IF NOT EXISTS status VARCHAR(255) DEFAULT 'published',
ADD COLUMN IF NOT EXISTS sort INTEGER,
ADD COLUMN IF NOT EXISTS user_created UUID,
ADD COLUMN IF NOT EXISTS date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS user_updated UUID,
ADD COLUMN IF NOT EXISTS date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_theme INTEGER;

-- Update name from theme_name if needed
UPDATE worksheet_template_themes SET name = theme_name WHERE name IS NULL AND theme_name IS NOT NULL;
UPDATE worksheet_template_themes SET name = 'Basic Worksheet' WHERE name IS NULL AND id = 1;
UPDATE worksheet_template_themes SET name = 'Winter' WHERE name IS NULL AND id = 2;

-- Update sort from sort_order if needed
UPDATE worksheet_template_themes SET sort = sort_order WHERE sort IS NULL AND sort_order IS NOT NULL;