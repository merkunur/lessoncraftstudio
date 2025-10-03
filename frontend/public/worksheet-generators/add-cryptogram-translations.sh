#!/bin/bash

# Backup the file
cp translations-cryptogram.js translations-cryptogram.js.backup

# Define the translations for each language
declare -A translations_generated=(
    ["de"]="Arbeitsblatt erfolgreich erstellt!"
    ["fr"]="Feuille de travail générée avec succès !"
    ["es"]="¡Hoja de trabajo generada con éxito!"
    ["it"]="Foglio di lavoro generato con successo!"
    ["pt"]="Folha de trabalho gerada com sucesso!"
    ["nl"]="Werkblad succesvol gegenereerd!"
    ["sv"]="Arbetsblad har skapats!"
    ["da"]="Arbejdsark genereret!"
    ["no"]="Arbeidsark generert!"
    ["fi"]="Työarkki luotu onnistuneesti!"
)

declare -A translations_error_details=(
    ["de"]="Fehler beim Generieren des Rätsels: {error}"
    ["fr"]="Erreur lors de la génération du puzzle : {error}"
    ["es"]="Error al generar el rompecabezas: {error}"
    ["it"]="Errore durante la generazione del puzzle: {error}"
    ["pt"]="Erro ao gerar o quebra-cabeça: {error}"
    ["nl"]="Fout bij het genereren van de puzzel: {error}"
    ["sv"]="Fel vid generering av pusslet: {error}"
    ["da"]="Fejl ved generering af puslespil: {error}"
    ["no"]="Feil ved generering av puslespill: {error}"
    ["fi"]="Virhe palapelin luomisessa: {error}"
)

declare -A translations_select_letter=(
    ["de"]="Bitte wählen Sie zuerst einen Buchstaben aus."
    ["fr"]="Veuillez d'abord sélectionner une lettre."
    ["es"]="Por favor, seleccione primero una letra."
    ["it"]="Seleziona prima una lettera."
    ["pt"]="Por favor, selecione primeiro uma letra."
    ["nl"]="Selecteer eerst een letter."
    ["sv"]="Välj först en bokstav."
    ["da"]="Vælg først et bogstav."
    ["no"]="Vennligst velg en bokstav først."
    ["fi"]="Valitse ensin kirjain."
)

declare -A translations_theme_load_failed=(
    ["de"]="Fehler beim Laden des Themas \"{theme}\"."
    ["fr"]="Échec du chargement du thème \"{theme}\"."
    ["es"]="Error al cargar el tema \"{theme}\"."
    ["it"]="Errore nel caricamento del tema \"{theme}\"."
    ["pt"]="Falha ao carregar o tema \"{theme}\"."
    ["nl"]="Fout bij het laden van thema \"{theme}\"."
    ["sv"]="Fel vid laddning av tema \"{theme}\"."
    ["da"]="Fejl ved indlæsning af tema \"{theme}\"."
    ["no"]="Feil ved lasting av tema \"{theme}\"."
    ["fi"]="Virhe teeman \"{theme}\" lataamisessa."
)

declare -A translations_images_uploaded=(
    ["de"]="{count} benutzerdefinierte(s) Bild(er) verfügbar."
    ["fr"]="{count} image(s) personnalisée(s) disponible(s)."
    ["es"]="{count} imagen(es) personalizada(s) disponible(s)."
    ["it"]="{count} immagine/i personalizzata/e disponibile/i."
    ["pt"]="{count} imagem(ns) personalizada(s) disponível(eis)."
    ["nl"]="{count} aangepaste afbeelding(en) beschikbaar."
    ["sv"]="{count} anpassad(e) bild(er) tillgänglig(a)."
    ["da"]="{count} brugerdefineret(e) billede(r) tilgængelig(e)."
    ["no"]="{count} tilpasset(e) bilde(r) tilgjengelig(e)."
    ["fi"]="{count} mukautettu(a) kuva(a) saatavilla."
)

echo "Translations defined successfully"
