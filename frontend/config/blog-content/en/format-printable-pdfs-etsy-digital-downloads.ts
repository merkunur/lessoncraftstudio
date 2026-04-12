import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'format PDF for Etsy digital download',
    secondaryKeywords: [
      'Etsy PDF formatting printables',
      'digital download file format Etsy',
      'printable PDF page size margins',
    ],
    lsiKeywords: [
      'Etsy digital product delivery',
      'PDF export settings printables',
      'digital download file optimization',
    ],
    titleTag: 'How to Format PDFs for Etsy Digital Downloads | LCS',
    metaDescription: 'Learn the exact PDF settings for Etsy digital downloads. Page size, margins, fonts, compression, and file size optimization for printable products.',
  },
  hero: {
    title: 'How to Format PDFs for Etsy Digital Downloads',
    tagline: 'The technical details that separate professional sellers from amateurs',
    description: 'A poorly formatted PDF generates refund requests, one-star reviews, and endless customer support messages. Buyers expect printable digital downloads to work perfectly on the first try — proper margins, correct page size, embedded fonts, and reasonable file size. This guide covers every technical detail of formatting PDFs for Etsy printable products.',
  },
  category: 'how-to',
  introduction: 'Etsy digital download buyers are printing your files on home printers with default settings. They are not adjusting margins, scaling options, or print quality. If your PDF does not print correctly out of the box, the buyer blames you, not their printer. Getting your PDF formatting right is not optional — it is the foundation of a professional printable business. Here is how to get every detail right.',
  sections: [
    {
      heading: 'Page Size: US Letter vs A4 and Why You Need Both',
      content: 'The single most common complaint about printable digital downloads is incorrect page size. Buyers print your file and it comes out cropped, scaled, or with uneven margins.\n\n**US Letter (8.5 x 11 inches):** Standard paper size in the United States and Canada. If your primary market is North American, this should be your default.\n\n**A4 (210 x 297 mm / 8.27 x 11.69 inches):** Standard paper size in Europe, Asia, South America, Africa, and Australia. A4 is slightly narrower and taller than US Letter.\n\n**Why this matters:** A US Letter PDF printed on A4 paper will have asymmetric margins — extra space at the top and bottom, slightly cropped on the sides. An A4 PDF printed on US Letter paper will be scaled down to fit, making text and activities smaller than intended.\n\n**The professional solution:** Offer both sizes. Include two PDF files in your digital download — one formatted for US Letter and one for A4. This doubles your potential market with minimal extra effort.\n\n**How to create both sizes efficiently:** Design your content with 0.75-inch margins on all sides. This safe zone ensures content looks correct on both paper sizes without redesigning. Then export two versions with different page dimensions.\n\n**In your listing, state this clearly:** "Includes both US Letter (8.5 x 11) and A4 formats for worldwide printing."',
    },
    {
      heading: 'Margins: The Safe Zone That Prevents Cropping',
      content: 'Home printers cannot print to the very edge of paper. Every printer has a non-printable area around the edges. If your content extends into this zone, it gets cut off.\n\n**Minimum safe margins:** 0.5 inches (12.7 mm) on all sides. This accounts for the non-printable area of most home inkjet and laser printers.\n\n**Recommended margins:** 0.75 inches (19 mm) on all sides. This provides a comfortable buffer and looks professional. Content does not feel cramped, and even older printers handle it without issues.\n\n**For activity books and worksheets:** Use 0.75-inch margins. Children need space to hold the page and write without their hand running off the edge. Generous margins also make the page look less cluttered.\n\n**For decorative printables:** If your design includes a decorative border, keep the border at least 0.5 inches from the page edge. The border itself should start at your safe margin, not at the page edge.\n\n**Common mistakes:**\n- Designing with zero margins and relying on the buyer to scale the print. They will not.\n- Using different margins on different pages within the same PDF. This makes the content jump when printed double-sided.\n- Placing page numbers or important content in the bottom 0.5 inches, where many printers cut off.\n\n**Testing:** Print your PDF on your own printer at default settings before listing it. If any content gets cropped, widen your margins.',
    },
    {
      heading: 'Font Embedding: Why Your Text Might Print as Boxes',
      content: 'If a buyer opens your PDF and sees empty boxes or garbled text instead of letters, the fonts are not embedded.\n\n**What font embedding means:** When you create a PDF, the software can either embed the actual font data inside the file or reference fonts installed on the computer. If the font is referenced but not embedded, anyone who does not have that font installed sees a substitution — often ugly, sometimes illegible.\n\n**Always embed all fonts.** This is non-negotiable for commercial PDF products. Every font used in your file must be fully embedded so it displays and prints correctly on any device.\n\n**How to embed fonts:**\n- Adobe Acrobat: File > Properties > Fonts tab shows embedded status\n- Canva: PDF Print downloads automatically embed fonts\n- Google Docs: Export as PDF embeds standard fonts\n- Word/PowerPoint: Save as PDF with "embed fonts" option checked\n- InDesign/Illustrator: Export with font embedding enabled\n\n**Font licensing:** Some fonts prohibit embedding in PDFs. If you use a font that cannot be embedded, you have two options: convert text to outlines (curves) or choose a different font. Commercial printable products should only use fonts with permissive licenses.\n\n**Verification step:** Open your exported PDF on a different computer or in a free PDF reader. If the text looks correct, your fonts are properly embedded. Do this check before listing every new product.\n\n**Outline conversion:** For decorative headings and titles, converting text to vector outlines eliminates all font dependency. The text becomes a shape that renders identically everywhere. Use this for display text but not for body text (outlined body text increases file size significantly).',
    },
    {
      heading: 'File Size Optimization for Etsy\'s 20 MB Limit',
      content: 'Etsy limits individual digital download files to 20 MB. Large activity book PDFs easily exceed this without optimization.\n\n**Strategies for staying under 20 MB:**\n\n**1. Compress images before placing them.** The biggest file size offender is uncompressed images. Run all raster images through an optimizer before embedding them in your PDF. Tools like TinyPNG or ImageOptim reduce file size by 40-70% with negligible quality loss.\n\n**2. Use vector content where possible.** Text, lines, shapes, and simple illustrations stored as vectors take a fraction of the space that raster images require. Worksheet generators that output vector-based PDFs produce dramatically smaller files.\n\n**3. Compress the final PDF.** After creating your PDF, run it through a compression tool. Adobe Acrobat\'s "Reduce File Size" feature, Smallpdf, or iLovePDF can shrink files by 50-80%. Use the "high quality print" compression preset.\n\n**4. Split large files.** A 200-page activity book can be split into logical sections: Part 1 (pages 1-70), Part 2 (pages 71-140), Part 3 (pages 141-200), plus a separate Answer Key. Label each file clearly.\n\n**5. Offer a single-page-per-sheet layout.** Some sellers provide both a combined PDF and individual page files. Individual pages are tiny (under 1 MB each) and let buyers print only the pages they want.\n\n**What your listing should say:** State the total file size, number of files, and page count. Example: "3 PDF files, 100 pages total, 45 MB combined (split into 3 files under 20 MB each for easy download)."',
    },
    {
      heading: 'Color Settings: RGB vs CMYK for Home Printing',
      content: 'Color mode affects both how your printable looks and how large the file is.\n\n**RGB (Red, Green, Blue):** The color mode used by screens. Home inkjet and laser printers accept RGB files and convert them internally. RGB files are about 25% smaller than CMYK equivalents.\n\n**CMYK (Cyan, Magenta, Yellow, Key/Black):** The color mode used by professional print shops. Colors are defined by ink mixing. CMYK files can look slightly duller on screen but print more accurately on commercial presses.\n\n**For Etsy digital downloads: Use RGB.** Your buyers are printing on home printers that work in RGB. Sending a CMYK file to a home printer can cause unexpected color shifts — colors may appear duller or slightly different from the listing preview.\n\n**For Amazon KDP: Use CMYK for full-color interiors.** KDP recommends CMYK for best color accuracy in their commercial printing process. For black-and-white interiors (most activity books), color mode does not matter.\n\n**Practical advice:**\n- Design in RGB for the widest compatibility\n- If you need CMYK for KDP, convert at the final export stage rather than designing in CMYK\n- Include a note in your Etsy listing: "Colors may vary slightly depending on your printer and paper"\n- Avoid neon or highly saturated colors that look vibrant on screen but print muddy\n\n**Black text:** Always use true black (RGB 0,0,0 or CMYK 0,0,0,100), never rich black (a mix of all four CMYK inks). Rich black on text causes registration issues on home printers and makes text look fuzzy.',
    },
    {
      heading: 'Print Settings Instructions: What to Include',
      content: 'Your buyers should not need to figure out print settings. Include a one-page instruction sheet in every digital download.\n\n**Essential printing instructions to include:**\n\n1. **Paper size:** "Print on US Letter (8.5 x 11 inch) paper" or "Print on A4 paper" — whichever file they are using\n2. **Scaling:** "Set scaling to \'Actual Size\' or 100% — do NOT use \'Fit to Page\'" (Fit to Page shrinks your content)\n3. **Orientation:** "Print in Portrait orientation" (or Landscape if applicable)\n4. **Quality:** "Select \'Best\' or \'High Quality\' print setting for clearest results"\n5. **Paper type:** "Standard printer paper works well. For coloring pages, use cardstock for better results with markers"\n6. **Double-sided printing:** State whether the file is designed for single-sided or double-sided printing\n\n**Format this instruction page well.** It is the first page of your PDF and sets the buyer\'s first impression. Use clear formatting, bullet points, and simple language. Include your shop logo for branding.\n\n**Add a troubleshooting section:**\n- "Content appears cropped? Check that scaling is set to Actual Size, not Fit to Page"\n- "Text looks blurry? Ensure print quality is set to Best or High"\n- "Colors look different? Screen colors always vary slightly from printed colors"\n\n**This single page prevents 80% of customer support messages** and earns goodwill that leads to positive reviews.',
    },
    {
      heading: 'Quality Checklist Before Listing on Etsy',
      content: 'Run through this checklist for every PDF before publishing your Etsy listing.\n\n**File format:**\n- [ ] PDF format (not JPG, PNG, or Word document)\n- [ ] PDF version 1.7 or earlier (maximum compatibility)\n- [ ] No password protection or editing restrictions\n\n**Page setup:**\n- [ ] Correct page size (US Letter and/or A4)\n- [ ] Margins at least 0.5 inches on all sides\n- [ ] Content centered on page with equal margins\n- [ ] Consistent orientation throughout (all portrait or all landscape)\n\n**Content quality:**\n- [ ] All fonts embedded (check in PDF properties)\n- [ ] Images at 300 DPI minimum\n- [ ] No broken images or missing elements\n- [ ] Spell check completed on all text\n- [ ] Page numbers present and sequential\n\n**File optimization:**\n- [ ] File size under 20 MB per file (Etsy limit)\n- [ ] Total download size reasonable (under 100 MB)\n- [ ] Files clearly named (e.g., "Math-Worksheets-USLetter.pdf")\n\n**Print testing:**\n- [ ] Printed on your own printer at default settings\n- [ ] No content cropped at edges\n- [ ] Text is sharp and readable\n- [ ] Images print clearly without pixelation\n- [ ] Colors appear as expected\n\n**This checklist takes 10 minutes per product and prevents hours of customer support and review damage.** Make it a non-negotiable part of your listing workflow.',
    },
  ],
  keyTakeaways: [
    'Always offer both US Letter and A4 versions of your printable PDFs for worldwide compatibility',
    'Use minimum 0.75-inch margins on all sides to prevent content cropping on home printers',
    'Embed all fonts in your PDF — unembedded fonts display as boxes on buyers\' devices',
    'Optimize PDF file size to stay under Etsy\'s 20 MB per-file limit using compression tools',
    'Use RGB color mode for Etsy digital downloads since buyers print on home RGB printers',
    'Include a one-page printing instruction sheet in every digital download to prevent support requests',
  ],
  faq: [
    {
      question: 'What file format should I use for Etsy digital downloads?',
      answer: 'PDF is the standard and expected format for printable digital downloads on Etsy. PDF files preserve formatting, embed fonts, and print consistently across different devices. Never deliver worksheets as Word documents, JPGs, or PNGs — these formats cause formatting problems for buyers.',
    },
    {
      question: 'How do I provide both US Letter and A4 versions?',
      answer: 'Include two separate PDF files in your Etsy digital download: one formatted for US Letter and one for A4. Name them clearly (e.g., "Worksheets-US-Letter.pdf" and "Worksheets-A4.pdf"). Most design tools let you change the page size and re-export without redesigning the content.',
    },
    {
      question: 'Should I password-protect my printable PDFs?',
      answer: 'No. Password protection and editing restrictions cause printing problems for many buyers. Their PDF reader may not support the protection, or their printer may refuse to process the file. The inconvenience to paying customers outweighs any piracy prevention benefit.',
    },
    {
      question: 'What if my file is larger than 20 MB?',
      answer: 'First, try PDF compression using tools like Smallpdf or iLovePDF. If the file is still too large, split it into multiple files (e.g., Part 1, Part 2, Answer Key). Etsy allows up to 5 files per digital download listing. Label each file clearly so buyers know what to print.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'addition', anchorText: 'Addition Worksheet Generator' },
    { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: 'KDP Size Calculator' },
    { pageType: 'app', slug: 'word-search', anchorText: 'Word Search Generator' },
  ],
  relatedPosts: [
    { slug: '300-dpi-vs-150-dpi-print-resolution-sellers', title: '300 DPI vs 150 DPI: Print Resolution Guide for Sellers' },
    { slug: 'us-letter-vs-a4-paper-size-international-sales', title: 'US Letter vs A4: Paper Size Strategy for International Sales' },
    { slug: 'write-etsy-descriptions-printable-products', title: 'How to Write Etsy Descriptions That Sell Printable Products' },
  ],
  cta: {
    heading: 'Generate Print-Ready Worksheets in Seconds',
    description: 'LessonCraftStudio generators produce properly formatted, print-ready PDFs automatically. Try any generator free trial with watermark to test the output quality.',
    buttonText: 'Browse All Generators',
    buttonUrl: '/apps',
  },
};

export default content;
