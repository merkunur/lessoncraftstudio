-- Create train_template_themes table
CREATE TABLE IF NOT EXISTS train_template_themes (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) DEFAULT 'draft',
    sort INTEGER,
    user_created UUID REFERENCES directus_users(id) ON DELETE SET NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_updated UUID REFERENCES directus_users(id) ON DELETE SET NULL,
    date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    translations JSONB,
    folder_name VARCHAR(255) UNIQUE,
    parent_theme INTEGER REFERENCES train_template_themes(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true
);

-- Create worksheet_template_themes table
CREATE TABLE IF NOT EXISTS worksheet_template_themes (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) DEFAULT 'draft',
    sort INTEGER,
    user_created UUID REFERENCES directus_users(id) ON DELETE SET NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_updated UUID REFERENCES directus_users(id) ON DELETE SET NULL,
    date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    translations JSONB,
    folder_name VARCHAR(255) UNIQUE,
    parent_theme INTEGER REFERENCES worksheet_template_themes(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true
);

-- Add indexes for performance
CREATE INDEX idx_train_template_themes_folder ON train_template_themes(folder_name);
CREATE INDEX idx_train_template_themes_active ON train_template_themes(is_active);
CREATE INDEX idx_worksheet_template_themes_folder ON worksheet_template_themes(folder_name);
CREATE INDEX idx_worksheet_template_themes_active ON worksheet_template_themes(is_active);

-- Insert default themes for train templates
INSERT INTO train_template_themes (name, folder_name, translations, is_active) VALUES
('Alphabet Trains', 'alphabet-trains', '{"en":"Alphabet Trains","de":"Alphabet-Züge","fr":"Trains Alphabet","es":"Trenes del Alfabeto","pt":"Trens do Alfabeto","it":"Treni Alfabeto","nl":"Alfabet Treinen","sv":"Alfabet Tåg","da":"Alfabet Tog","no":"Alfabet Tog","fi":"Aakkosjunat"}', true),
('Pattern Trains', 'pattern-trains', '{"en":"Pattern Trains","de":"Muster-Züge","fr":"Trains de Motifs","es":"Trenes de Patrones","pt":"Trens de Padrões","it":"Treni di Pattern","nl":"Patroon Treinen","sv":"Mönster Tåg","da":"Mønster Tog","no":"Mønster Tog","fi":"Kuviojunat"}', true),
('Number Trains', 'number-trains', '{"en":"Number Trains","de":"Zahlen-Züge","fr":"Trains de Nombres","es":"Trenes de Números","pt":"Trens de Números","it":"Treni di Numeri","nl":"Nummer Treinen","sv":"Nummer Tåg","da":"Tal Tog","no":"Tall Tog","fi":"Numerojunat"}', true);

-- Insert default themes for worksheet templates
INSERT INTO worksheet_template_themes (name, folder_name, translations, is_active) VALUES
('Preposition Templates', 'preposition-templates', '{"en":"Preposition Templates","de":"Präposition Vorlagen","fr":"Modèles de Prépositions","es":"Plantillas de Preposiciones","pt":"Modelos de Preposições","it":"Modelli di Preposizioni","nl":"Voorzetsel Sjablonen","sv":"Prepositions Mallar","da":"Præpositions Skabeloner","no":"Preposisjons Maler","fi":"Prepositio Mallit"}', true),
('Grammar Templates', 'grammar-templates', '{"en":"Grammar Templates","de":"Grammatik Vorlagen","fr":"Modèles de Grammaire","es":"Plantillas de Gramática","pt":"Modelos de Gramática","it":"Modelli di Grammatica","nl":"Grammatica Sjablonen","sv":"Grammatik Mallar","da":"Grammatik Skabeloner","no":"Grammatikk Maler","fi":"Kielioppi Mallit"}', true),
('Vocabulary Templates', 'vocabulary-templates', '{"en":"Vocabulary Templates","de":"Vokabular Vorlagen","fr":"Modèles de Vocabulaire","es":"Plantillas de Vocabulario","pt":"Modelos de Vocabulário","it":"Modelli di Vocabolario","nl":"Woordenschat Sjablonen","sv":"Ordförråd Mallar","da":"Ordforråd Skabeloner","no":"Ordforråd Maler","fi":"Sanasto Mallit"}', true);