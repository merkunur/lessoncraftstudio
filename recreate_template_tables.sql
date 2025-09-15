-- Recreate template tables with UUID primary keys
-- This fixes the schema mismatch issue

-- First, drop the existing tables (CASCADE will remove related constraints)
DROP TABLE IF EXISTS train_template_images CASCADE;
DROP TABLE IF EXISTS worksheet_template_images CASCADE;
DROP TABLE IF EXISTS train_template_themes CASCADE;
DROP TABLE IF EXISTS worksheet_template_themes CASCADE;

-- Create train_template_themes with UUID
CREATE TABLE train_template_themes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    folder_name varchar(255),
    theme_name varchar(255),
    name varchar(255),
    translations json,
    is_active boolean DEFAULT true,
    status varchar(255) DEFAULT 'published',
    sort_order integer DEFAULT 999,
    sort integer,
    parent_theme uuid,
    user_created uuid,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_updated uuid,
    date_updated timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create worksheet_template_themes with UUID
CREATE TABLE worksheet_template_themes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    folder_name varchar(255),
    theme_name varchar(255),
    name varchar(255),
    translations json,
    is_active boolean DEFAULT true,
    status varchar(255) DEFAULT 'published',
    sort_order integer DEFAULT 999,
    sort integer,
    parent_theme uuid,
    user_created uuid,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    user_updated uuid,
    date_updated timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create train_template_images with UUID
CREATE TABLE train_template_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name varchar(255),
    theme_id uuid REFERENCES train_template_themes(id),
    image_file uuid,
    translations json,
    status varchar(255) DEFAULT 'active'
);

-- Create worksheet_template_images with UUID
CREATE TABLE worksheet_template_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name varchar(255),
    theme_id uuid REFERENCES worksheet_template_themes(id),
    image_file uuid,
    translations json,
    status varchar(255) DEFAULT 'active'
);

-- Create indexes for better performance
CREATE INDEX idx_train_template_images_theme ON train_template_images(theme_id);
CREATE INDEX idx_worksheet_template_images_theme ON worksheet_template_images(theme_id);
CREATE INDEX idx_train_template_images_status ON train_template_images(status);
CREATE INDEX idx_worksheet_template_images_status ON worksheet_template_images(status);

-- Grant permissions
GRANT ALL ON train_template_themes TO lcsuser;
GRANT ALL ON worksheet_template_themes TO lcsuser;
GRANT ALL ON train_template_images TO lcsuser;
GRANT ALL ON worksheet_template_images TO lcsuser;