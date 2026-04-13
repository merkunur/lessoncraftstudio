import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'DPI for KDP printables',
    secondaryKeywords: [
      '300 DPI vs 150 DPI printables',
      'print resolution KDP activity books',
      'DPI requirements Etsy digital downloads',
    ],
    lsiKeywords: [
      'printable image quality',
      'PDF export resolution settings',
      'print-ready file preparation',
    ],
    titleTag: '300 DPI vs 150 DPI: Print Resolution Guide for Sellers | LessonCraftStudio',
    metaDescription: 'Understand 300 DPI vs 150 DPI for printable products. Learn KDP resolution requirements, when lower DPI is acceptable, and how to check your file quality.',
  },
  hero: {
    title: '300 DPI vs 150 DPI: Print Resolution Guide for Printable Sellers',
    tagline: 'When maximum resolution matters and when it is overkill',
    description: 'DPI confusion costs printable sellers time, money, and reviews. Some sellers export everything at 300 DPI and end up with massive files that frustrate buyers. Others use 150 DPI and get complaints about blurry prints. The right resolution depends on your content type, distribution platform, and how your buyers will use the file. This guide cuts through the confusion with clear, actionable recommendations.',
  },
  category: 'how-to',
  introduction: 'DPI stands for dots per inch. It determines how many tiny dots of ink a printer places within each inch of paper. Higher DPI means more dots, which means sharper detail. But higher DPI also means larger file sizes and longer download times. For printable sellers, the question is not simply "is 300 DPI better than 150 DPI?" — it is "what resolution does my specific product need to look professional when printed?"',
  sections: [
    {
      heading: 'What DPI Actually Means for Printable Products',
      content: 'Let us demystify DPI with a practical explanation that matters for sellers.\n\n**DPI and print quality:** At 300 DPI, a printed page contains 300 dots of ink per inch. At 150 DPI, that same inch contains only 150 dots. The difference is visible when you examine fine details like small text, thin lines, and detailed illustrations.\n\n**DPI and file size:** A 300 DPI version of a page is roughly 4 times larger in file size than a 150 DPI version. A single 8.5 x 11 page at 300 DPI might be 2-4 MB, while the same page at 150 DPI is 500 KB to 1 MB. For a 100-page activity book, that is the difference between a 200 MB file and a 50 MB file.\n\n**DPI on screen vs. DPI in print:** Your computer screen displays images at 72-96 DPI regardless of the file\'s actual DPI. A 300 DPI file and a 150 DPI file look identical on screen. The difference only appears when the file is printed. This is why some sellers think 150 DPI is "good enough" — they only check on screen.\n\n**What buyers experience:** Most home printers default to 150-300 DPI output. If your file is 300 DPI, the printer uses all available detail. If your file is 150 DPI, the printer either prints at lower quality or upscales the image, resulting in slight blurriness on fine details.',
    },
    {
      heading: 'KDP Resolution Requirements and Recommendations',
      content: 'Amazon KDP has specific resolution requirements that every publisher must meet.\n\n**KDP minimum requirement:** 300 DPI for all interior images and cover files. This is not a suggestion — files below 300 DPI may be rejected during the publishing review process. Even if KDP accepts a lower-resolution file, it may flag a quality warning that delays your publication.\n\n**Cover files:** Always 300 DPI, no exceptions. Your cover is the first thing buyers see. Low-resolution covers look amateur and tank conversion rates. KDP requires the cover to be a single image file at exactly 300 DPI.\n\n**Interior files:** KDP specifies 300 DPI as the standard. For text-only interiors (like word puzzles), the PDF can be vector-based rather than raster, which makes DPI irrelevant for the text itself. But any embedded images (illustrations, photos, decorative elements) must be 300 DPI.\n\n**Practical reality:** Many successful KDP publishers create vector-based PDFs where the content is mathematically defined rather than pixel-based. Math worksheets with numbers and lines, word search grids, and crossword puzzles are all vector content in a properly generated PDF. DPI only matters for the image elements.\n\n**The safe approach:** Export all KDP files at 300 DPI. The file size does not matter for KDP because you upload the file once and Amazon handles printing. There is no download speed concern for the end buyer.',
    },
    {
      heading: 'DPI for Etsy Digital Downloads: Different Considerations',
      content: 'Etsy digital downloads have different DPI considerations than KDP because buyers download and print files themselves.\n\n**File size limits:** Etsy limits digital download files to 20 MB each. A 100-page activity book at 300 DPI can easily exceed this limit. You may need to split the file or optimize the resolution.\n\n**Buyer experience:** Buyers with slow internet connections or limited storage may struggle with very large files. A 200 MB download is frustrating and generates support requests. Optimizing file size while maintaining print quality is a real customer service consideration.\n\n**Recommended approach for Etsy:**\n- Text-based content (worksheets, puzzles): 200-300 DPI is ideal. Pure text and line art look sharp even at 200 DPI.\n- Illustration-heavy content (coloring pages, themed activities): 300 DPI is necessary. Detailed artwork shows visible quality loss below 300 DPI.\n- Mixed content: 300 DPI for the PDF, then compress the PDF to reduce file size without lowering resolution.\n\n**PDF compression matters more than DPI for Etsy.** A well-compressed 300 DPI PDF can be smaller than an uncompressed 150 DPI PDF. Use PDF optimization tools to reduce file size while preserving the 300 DPI resolution.\n\n**Provide printing instructions.** Include a note in your listing: "For best results, print at actual size (100%) on standard paper." This prevents buyers from scaling the file and then blaming you for poor quality.',
    },
    {
      heading: 'When 150 DPI Is Actually Acceptable',
      content: 'Despite the 300 DPI standard, there are legitimate cases where 150 DPI works fine.\n\n**Large-format prints.** If your printable is designed for poster-size printing (24x36 inches or larger), viewers look at it from a distance. At arm\'s length, 150 DPI is indistinguishable from 300 DPI. This applies to wall art, large posters, and classroom display printables.\n\n**Screen-only content.** If your product is designed to be used digitally (fill-in PDFs, screen-based activities), 150 DPI is more than sufficient because screens display at 72-96 DPI anyway.\n\n**Solid color fills.** Large areas of solid color (backgrounds, borders, color blocks) look identical at 150 and 300 DPI because there is no detail to resolve. Only edges and gradients show a difference.\n\n**Draft or sample versions.** Watermarked preview files or sample pages can use 150 DPI to keep file sizes small. Save the full 300 DPI for the purchased product.\n\n**When it is NOT acceptable at 150 DPI:**\n- Small text (below 10pt font)\n- Detailed line art and illustrations\n- Photographs or photo-realistic images\n- Fine patterns and decorative borders\n- Any file intended for professional print shops\n\nWhen in doubt, use 300 DPI. The marginal increase in file size is almost always worth the quality assurance.',
    },
    {
      heading: 'How to Check and Fix DPI in Your Files',
      content: 'Before listing any printable product, verify its resolution.\n\n**Checking DPI in Adobe Acrobat:**\n1. Open the PDF\n2. Go to File > Properties > Advanced\n3. Check the resolution of embedded images\n4. Or use Preflight (Edit > Preflight) to run a resolution check on all images\n\n**Checking DPI in free tools:**\n- PDF24 (free): Open PDF, check properties\n- GIMP (free): Open individual images, check Image > Canvas Size and Image > Print Size\n- Online tools: Upload a file and get a DPI report (be cautious with confidential designs)\n\n**Fixing low-resolution files:**\nYou cannot truly increase DPI after the fact. Upscaling a 150 DPI image to 300 DPI just makes each pixel bigger — it does not add detail. The image will look the same when printed.\n\n**The only real fix:** Go back to your source file and export at the correct resolution. If you use worksheet generators, check the export settings before generating. If you design in Canva, set your document to the correct print dimensions and download as PDF Print (which defaults to 300 DPI).\n\n**Prevention is key:** Set your tools to 300 DPI output from the start. Checking and fixing after the fact wastes time and usually means re-doing work. Make 300 DPI your default export setting for everything.',
    },
    {
      heading: 'File Size Optimization Without Sacrificing Quality',
      content: 'You can have both high resolution and reasonable file sizes with the right optimization techniques.\n\n**PDF compression:** Tools like Adobe Acrobat, Smallpdf, and iLovePDF can compress PDFs by 50-80% without visible quality loss. They achieve this by optimizing the internal structure of the PDF, not by reducing image resolution.\n\n**Vector vs. raster content:** Text, lines, and shapes stored as vectors have zero DPI — they scale perfectly at any size and keep files small. Only raster elements (photos, complex illustrations) add significant file size. Worksheet generators that output vector-based PDFs produce smaller files at perfect quality.\n\n**Image optimization before embedding:** If your PDF includes raster images (clipart, photos, decorative elements), optimize those images before placing them in the PDF. Remove unnecessary metadata, use efficient compression, and ensure images are at exactly 300 DPI — not higher. An image at 600 DPI takes 4 times the space of 300 DPI with no visible improvement in print.\n\n**Color mode matters:** CMYK files are roughly 33% larger than RGB files. For home printing (which uses RGB), there is no benefit to CMYK. For professional printing and KDP, CMYK is preferred. Know your output and choose accordingly.\n\n**Splitting large files:** For Etsy digital downloads, split large activity books into logical sections. A 100-page book can be three files: Pages 1-35, Pages 36-70, Pages 71-100, plus a separate answer key file. Each file stays under the 20 MB Etsy limit while maintaining 300 DPI quality.\n\n**Quick reference:** A well-optimized 100-page worksheet PDF at 300 DPI should be 10-30 MB. If your file is significantly larger, it needs optimization. If it is under 5 MB, double-check that it is actually 300 DPI.',
    },
    {
      heading: 'Platform-Specific Resolution Cheat Sheet',
      content: 'Here is a quick reference for resolution settings across major platforms.\n\n**Amazon KDP (paperback):**\n- Interior: 300 DPI minimum (required)\n- Cover: 300 DPI minimum (required)\n- File format: PDF\n- Max file size: 650 MB (generous limit)\n- Recommendation: Always 300 DPI, no optimization needed\n\n**Etsy Digital Downloads:**\n- Resolution: 300 DPI recommended (not enforced)\n- File format: PDF, PNG, or JPG\n- Max file size: 20 MB per file\n- Recommendation: 300 DPI with PDF compression\n\n**Gumroad:**\n- Resolution: No requirements\n- Max file size: 16 GB\n- Recommendation: 300 DPI, minimal optimization needed\n\n**Your own website:**\n- Resolution: Your choice\n- File size: Limited by hosting\n- Recommendation: 300 DPI with compression for fast downloads\n\n**General rule:** Always create your master files at 300 DPI. You can always create optimized versions for specific platforms, but you cannot upscale a low-resolution master. Think of 300 DPI as your archive quality and platform-specific versions as distribution copies.\n\n**For watermarked preview files:** 72-150 DPI is sufficient. Keep previews small to prevent unauthorized high-quality printing while still looking good on screen for potential buyers.',
    },
  ],
  keyTakeaways: [
    '300 DPI is the standard for all printable products and the minimum required by Amazon KDP',
    '150 DPI is only acceptable for large-format prints viewed from a distance or screen-only content',
    'PDF compression can reduce file size by 50-80% without lowering DPI or visible quality',
    'Vector-based PDFs from worksheet generators are resolution-independent and always print sharply',
    'For Etsy, optimize file size for the 20 MB limit while maintaining 300 DPI resolution',
    'Always create master files at 300 DPI and create platform-specific optimized versions as needed',
  ],
  faq: [
    {
      question: 'Will KDP reject my book if it is below 300 DPI?',
      answer: 'KDP may flag or reject files with images below 300 DPI during the publishing review. Text-only vector content is not affected by DPI settings. To avoid delays, ensure all embedded images are 300 DPI and export your final PDF at 300 DPI or higher.',
    },
    {
      question: 'Can I upscale a 150 DPI image to 300 DPI?',
      answer: 'Technically yes, but it does not improve quality. Upscaling makes each pixel larger without adding detail. The print will look the same as the original 150 DPI version. The only real solution is to go back to your source file and export at 300 DPI.',
    },
    {
      question: 'Does DPI matter for digital-only products like fillable PDFs?',
      answer: 'For products used exclusively on screen, DPI has minimal impact because screens display at 72-96 DPI. However, many buyers print digital products even when they are designed for screen use. Using 300 DPI ensures your product looks professional regardless of how the buyer uses it.',
    },
    {
      question: 'What DPI should I use for product mockup photos?',
      answer: 'Product mockup photos for your listings only display on screen, so 72-150 DPI at web dimensions (1500-2000 pixels wide) is sufficient. Save high DPI for the actual downloadable product files, not the listing images.',
    },
  ],
  internalLinks: [
    { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: 'KDP Size Calculator' },
    { pageType: 'app', slug: 'coloring', anchorText: 'Coloring Page Generator' },
    { pageType: 'app', slug: 'addition', anchorText: 'Addition Worksheet Generator' },
  ],
  relatedPosts: [
    { slug: 'kdp-trim-sizes-activity-books', title: 'KDP Trim Sizes for Activity Books: The Complete Comparison' },
    { slug: 'format-printable-pdfs-etsy-digital-downloads', title: 'How to Format PDFs for Etsy Digital Downloads' },
    { slug: 'us-letter-vs-a4-paper-size-international-sales', title: 'US Letter vs A4: Paper Size Strategy for International Sales' },
  ],
  cta: {
    heading: 'Generate Print-Ready Worksheets Instantly',
    description: 'LessonCraftStudio generators produce print-ready PDFs at optimal resolution. Try any generator free trial with watermark to see the output quality.',
    buttonText: 'Browse All Generators',
    buttonUrl: '/apps',
  },
};

export default content;
