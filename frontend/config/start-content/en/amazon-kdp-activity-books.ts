import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: 'amazon-kdp-activity-books',
  locale: 'en',

  seo: {
    titleTag: 'How to Sell Activity Books on Amazon KDP (2026)',
    metaDescription: 'Learn how to sell activity books on Amazon KDP. Manuscript formatting, keyword research, category selection, pricing strategies, and publishing tips for puzzle books.',
    primaryKeyword: 'how to sell activity books on amazon',
    secondaryKeywords: [
      'amazon kdp activity books',
      'sell puzzle books amazon',
      'kdp worksheet publishing',
      'amazon activity book publishing',
      'self publish activity books',
    ],
    lsiKeywords: [
      'kdp manuscript formatting',
      'amazon keyword research',
      'kdp category selection',
      'print on demand books',
      'kdp royalty calculator',
      'amazon book publishing',
      'activity book interior',
      'kdp cover design',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/sudoku/Sudoku 1.jpeg',
      primaryAlt: 'Professional sudoku puzzle page formatted for Amazon KDP activity book publishing',
      secondary: '/samples/english/sudoku/Sudoku 2.jpeg',
      secondaryAlt: 'Sudoku answer key page demonstrating KDP-ready interior formatting',
    },
    sampleGallery: [
      { src: '/samples/english/sudoku/Sudoku 3.jpeg', alt: 'Easy sudoku puzzle page for beginner activity book on Amazon', caption: 'Easy difficulty for beginners' },
      { src: '/samples/english/sudoku/Sudoku 4.jpeg', alt: 'Medium difficulty sudoku for comprehensive puzzle book', caption: 'Medium challenge level' },
      { src: '/samples/english/sudoku/Sudoku 5.jpeg', alt: 'Hard sudoku puzzle demonstrating advanced content for adult market', caption: 'Hard puzzles for enthusiasts' },
      { src: '/samples/english/sudoku/Sudoku 6.jpeg', alt: 'Sudoku book interior sample with clean formatting for print', caption: 'Clean print-ready formatting' },
    ],
    youtubeId: 'bqVioFbkYbA',
    videoTitle: 'How to Publish Activity Books on Amazon KDP',
  },

  hero: {
    title: 'Amazon KDP Activity Books',
    subtitle: 'Publish professional activity and puzzle books on Amazon with zero upfront costs',
    readingTime: '15 min read',
    description: `Amazon KDP is the world\u2019s largest self-publishing platform, and learning how to sell activity books on Amazon opens the door to a marketplace with hundreds of millions of active customers. Unlike Etsy\u2019s digital download model, KDP prints physical paperback books on demand and ships them directly to buyers. You earn royalties on every sale with zero printing, inventory, or shipping costs.

Activity books and puzzle books are among the most consistent KDP categories. Sudoku books, word search collections, math workbooks, and coloring books generate steady sales year-round because buyers consume them and need replacements. A well-optimized activity book can sell 5 to 20 copies daily for months or even years after publication.

This guide covers the complete KDP publishing workflow for activity books: manuscript formatting, cover design, keyword research, category selection, pricing optimization, and launch strategies. Whether you are publishing your first book or your fiftieth, these techniques reflect the current best practices used by successful KDP activity book publishers.`,
  },

  introduction: `Amazon KDP has transformed activity book publishing from an expensive, risky venture into a zero-cost business model accessible to anyone. You upload your manuscript and cover, set your price, and Amazon handles everything else: printing, shipping, customer service, and payment processing.

The activity book market on Amazon is substantial and growing. Parents buy workbooks for summer learning and school supplements. Teachers purchase classroom activity books in bulk. Puzzle enthusiasts consume sudoku, crossword, and word search books voraciously \u2014 many buying a new book every week or two.

The key advantage of KDP over digital download platforms is Amazon\u2019s organic discovery engine. While Etsy requires you to drive traffic through SEO and external marketing, Amazon actively recommends your book to buyers who purchased similar products. This "also bought" recommendation system can drive sales without any marketing effort on your part.

However, KDP success requires understanding Amazon\u2019s specific formatting requirements, search algorithm, and competitive dynamics. A beautiful manuscript that does not meet KDP\u2019s technical specifications will be rejected. A perfectly formatted book with poor keywords will never appear in search results.

This guide covers every aspect of the KDP publishing process for activity books, from manuscript creation to post-launch optimization. Each section includes specific, actionable guidance based on what currently works in the KDP marketplace.`,

  mainContent: [
    {
      heading: 'Understanding the KDP Business Model',
      content: `KDP operates as a print-on-demand publisher. When a customer orders your book, Amazon prints a single copy and ships it. You never touch inventory, and you never pay for unsold copies.

Your earnings come from royalties \u2014 the difference between your book\u2019s list price and Amazon\u2019s printing cost. For a typical 100-page, 8.5 x 11 inch activity book priced at $7.99, the printing cost is approximately $3.85, and your royalty is approximately $2.50 (after Amazon\u2019s 40% cut of the remaining margin).

The math works because of volume. Ten sales per day at $2.50 royalty equals $750 per month from a single book. Successful KDP publishers have catalogs of 20 to 100+ books, each generating daily sales. A catalog of 50 activity books averaging 3 sales per day each would generate approximately $11,250 per month in royalties.

KDP offers both paperback and hardcover options. Paperback is the standard for activity books because the lower price point drives higher volume. Hardcover options work for premium gift-oriented products but are less common in the activity book category.

Expanded distribution is an optional KDP setting that makes your book available through third-party retailers (libraries, bookstores, online retailers beyond Amazon). Expanded distribution reduces your royalty per sale but increases your potential reach. Most activity book publishers find that expanded distribution generates incremental sales worth the reduced margin.`,
    },
    {
      heading: 'Manuscript Formatting for KDP',
      content: `KDP has strict technical requirements for manuscript files. Failure to meet these requirements results in rejection during the upload review process.

Your interior file must be a PDF at 300 DPI resolution. Use CMYK color space for color interiors or grayscale for black-and-white content. Most activity books use grayscale interiors because color printing significantly increases Amazon\u2019s printing cost, which reduces your royalty.

Page dimensions must match your selected trim size exactly. Standard activity book sizes are 8.5 x 11 inches (letter), 8 x 10 inches, and 6 x 9 inches. The 8.5 x 11 inch format is most popular for worksheets and educational content. The 6 x 9 inch format works well for puzzle books (sudoku, crosswords) because it is portable.

Margins must account for the binding gutter. The inside margin (closest to the spine) needs to be larger than the outside margin to ensure content does not disappear into the binding. For books under 150 pages, KDP requires a minimum inside margin of 0.375 inches. For books over 150 pages, the requirement increases to 0.75 inches.

Bleed settings determine whether your content extends to the edge of the page. Most activity books use no-bleed formatting, which adds a white border around all pages. If your design extends to the page edges (full-page coloring sheets, for example), enable bleed and add 0.125 inches of extra content on all sides.

Page count must be between 24 and 828 pages. Activity books typically fall in the 80 to 200 page range. Include answer keys in your page count \u2014 they add value for buyers and contribute to a thicker, more substantial book.`,
    },
    {
      heading: 'Cover Design That Sells',
      content: `Your book cover is the single most influential factor in a buyer\u2019s purchase decision on Amazon. Browsers see your cover as a small thumbnail in search results, so it must be visually impactful even at reduced size.

Effective activity book covers share several characteristics. A clear, readable title that communicates exactly what the book contains. Bold, contrasting colors that stand out in Amazon\u2019s white search results page. Sample imagery showing the type of activities inside. An age or difficulty indicator (e.g., "Ages 4-8" or "Easy to Hard").

KDP provides a cover template generator that creates a template matching your book\u2019s exact dimensions, including spine width. Download this template before designing your cover to ensure proper alignment. The spine width depends on your page count and paper type.

Your cover file must include the front cover, spine, and back cover as a single PDF. The back cover should include a brief description of the book\u2019s contents, a barcode area (Amazon adds the barcode automatically), and optionally, sample page images.

Professional cover design does not require expensive software. Canva offers free book cover templates that you can customize with your title, images, and branding. Many successful KDP publishers use Canva exclusively for cover design with excellent results.

Test your cover\u2019s effectiveness by viewing it at thumbnail size (approximately 160 x 250 pixels). If you cannot read the title or understand the book\u2019s content at that size, your cover needs revision. Amazon shoppers spend seconds evaluating covers in search results \u2014 clarity at small sizes is essential.`,
    },
    {
      heading: 'Keyword Research for Amazon Rankings',
      content: `Amazon allows seven keyword phrases for each book, each up to 50 characters. These backend keywords do not appear in your listing but heavily influence search visibility. Choosing the right keywords is critical for discoverability.

Start with Amazon\u2019s own search suggestions. Type the beginning of your target phrase into Amazon\u2019s search bar and note the autocomplete suggestions. These suggestions reflect actual buyer search behavior and indicate proven demand.

Analyze competing books\u2019 listings for keyword ideas. Read the titles, subtitles, and descriptions of top-selling books in your category. Note the specific terms they use \u2014 these are likely their target keywords. Do not copy their titles, but use their keyword choices to inform your own research.

Your seven keyword phrases should cover different aspects of buyer intent. For a sudoku puzzle book, your keywords might include: "sudoku puzzle book for adults easy to hard," "large print sudoku puzzles with solutions," "brain games for seniors," "puzzle books for adults challenging," "sudoku for beginners step by step," "logic puzzles adult activity book," and "relaxation puzzle book stress relief."

Avoid repeating words from your title in your keywords. Amazon indexes your title automatically, so keyword slots should target terms not already in the title. This expands your total keyword footprint rather than duplicating coverage.

Do not use competitor brand names, misleading terms, or subjective claims (like "best" or "#1") in your keywords. Amazon will suppress your listing if they detect prohibited keyword practices. Stick to descriptive, accurate terms that genuinely describe your book\u2019s content.`,
    },
    {
      heading: 'Category Selection for Maximum Visibility',
      content: `Amazon\u2019s category system determines which browse lists your book appears in and who sees it in recommendations. Strategic category selection can be the difference between page-one visibility and complete obscurity.

KDP allows you to select two BISAC categories during publication. These categories place your book in Amazon\u2019s browse tree. Choose categories that accurately describe your book but have manageable competition levels.

Research category competitiveness before selecting. Look at the Best Sellers Rank (BSR) of the top 10 books in your target category. If the number-one book has a BSR of 5,000 (indicating roughly 20+ sales per day), competing in that category requires significant sales volume. If the top book has a BSR of 50,000 (roughly 2-3 sales per day), you can realistically reach the first page.

Amazon has additional categories beyond what KDP offers in the publishing interface. After your book is published, you can contact KDP support to request placement in up to 10 categories. Identify relevant but less competitive categories by browsing Amazon\u2019s category tree in the Books section.

Category bestseller badges provide significant visibility boosts. An orange "Best Seller" badge appears when your book reaches number one in any of its categories. Targeting smaller categories where you can realistically achieve the top position is more valuable than placing in a large category where you rank 500th.

Monitor your category rankings after launch. If your book consistently ranks in the top 20 of its categories, it benefits from persistent visibility in category browse pages. If it ranks below 100, consider requesting additional or different categories that might be a better fit.`,
    },
    {
      heading: 'Pricing for Maximum Royalties',
      content: `KDP pricing directly determines your royalty per sale. Amazon\u2019s royalty calculation subtracts a fixed printing cost from your list price, then takes a percentage of the remainder.

Use Amazon\u2019s royalty calculator (available in your KDP dashboard) to model different price points. Enter your book\u2019s page count, trim size, paper type, and marketplace to see the exact royalty at each price point.

For standard activity books, the optimal price range balances royalty amount against conversion rate. Pricing a 100-page activity book at $6.99 might yield a $1.80 royalty with high sales volume. Pricing the same book at $9.99 yields a $3.80 royalty but likely reduces volume. Test different price points to find the sweet spot for your specific category.

Analyze competing books\u2019 pricing carefully. If the top 10 books in your category are priced between $5.99 and $8.99, pricing your book at $12.99 will likely result in poor conversion. Conversely, pricing at $3.99 might signal low quality. Match the market range and let your cover, description, and reviews differentiate your product.

Consider pricing strategies for new versus established books. Launch a new book at the lower end of the competitive range to generate initial sales and reviews. After accumulating 15 to 25 reviews, increase the price to optimize royalties. This approach trades short-term margin for long-term ranking and credibility.

International pricing is set separately for each Amazon marketplace (US, UK, Germany, France, etc.). Research competitive pricing in each marketplace rather than using Amazon\u2019s automatic conversion. Manual pricing optimization for each marketplace can increase international sales significantly.`,
    },
    {
      heading: 'Launch Strategy for New KDP Books',
      content: `A structured launch strategy gives your new book the best chance of gaining traction in Amazon\u2019s algorithm during the critical first 30 days.

Pre-launch preparation includes finalizing your manuscript, cover, description, keywords, and categories before clicking publish. Having everything polished and ready eliminates the need for post-launch edits that can temporarily suppress your listing\u2019s visibility.

The first 72 hours after publication are the most important. Amazon gives new listings a temporary visibility boost during this window. Drive as many sales as possible during this period through social media announcements, email list notifications, and any external marketing channels you have.

Amazon\u2019s algorithm evaluates your book\u2019s sales velocity (sales per day) relative to competing books. A book that sells 10 copies in its first three days receives a stronger algorithmic boost than one that sells 10 copies over its first month. Concentrated early sales momentum compounds through Amazon\u2019s recommendation engine.

Request reviews from early buyers. Amazon allows you to include a brief note at the end of your book asking readers to leave a review. Reviews improve your book\u2019s conversion rate and signal quality to Amazon\u2019s algorithm. Even 5 to 10 reviews make a meaningful difference for activity books.

Monitor your BSR daily during the first two weeks. A rising BSR (getting closer to 1) indicates increasing sales. A falling BSR (getting further from 1) indicates declining sales. Use BSR trends to evaluate whether your launch strategy is working and adjust your marketing efforts accordingly.

After the initial launch period, shift focus to organic discoverability. Optimize your listing description, experiment with pricing, and consider KDP advertising (Amazon\u2019s built-in ad platform) to maintain visibility in search results.`,
    },
    {
      heading: 'Building a KDP Publishing Catalog',
      content: `Long-term KDP success comes from building a catalog of books that collectively generate meaningful daily royalties. Individual book performance varies, but a diversified catalog provides stable income.

Catalog expansion should be strategic, not random. Publish books in related categories so that Amazon\u2019s "also bought" algorithm cross-promotes your catalog. If your first book is an easy sudoku book, your second should be a medium sudoku book, not a coloring book. Buyers of easy sudoku frequently purchase medium sudoku next, creating automatic cross-selling.

Series branding helps buyers identify your books as part of a collection. Use consistent cover design elements, title formatting, and author name across all books in a series. "Brain Puzzles Volume 1," "Brain Puzzles Volume 2," etc., creates a recognizable brand that encourages repeat purchases.

Aim for a publishing pace of 2 to 4 books per month. This pace builds catalog depth quickly while maintaining quality. Worksheet generator tools make this pace sustainable \u2014 a single batch session can produce enough content for an entire book.

Track the performance of each book individually. Some books will become reliable sellers generating daily royalties. Others will underperform despite your best efforts. Do not invest additional marketing resources in underperforming books. Instead, analyze why your successful books work and create more books with similar characteristics.

Diversify across multiple Amazon marketplaces. A sudoku book published on Amazon.com, Amazon.co.uk, Amazon.de, and Amazon.fr reaches four distinct buyer pools. International marketplaces often have less competition, meaning your book can achieve higher category rankings with fewer sales.`,
    },
    {
      heading: 'KDP Advertising Basics',
      content: `KDP advertising (formerly AMS advertising) is Amazon\u2019s built-in ad platform for book promotion. It places your book in sponsored positions within search results and on competitor book pages.

KDP offers three ad types: Sponsored Products, Sponsored Brands, and Lockscreen Ads. For activity books, Sponsored Products is the most effective and cost-efficient format. These ads appear in search results and on product pages with a small "Sponsored" label.

Start with a small daily budget ($3 to $5) and automatic targeting. Automatic targeting lets Amazon\u2019s algorithm choose which searches to show your ad for, based on your book\u2019s content and metadata. This approach reveals which keywords actually drive sales without requiring you to guess.

After running automatic campaigns for two weeks, review the search term report. This report shows exactly which search terms triggered your ad and whether they resulted in sales. Extract profitable search terms and create a manual campaign targeting only those terms with higher bids.

Track your Advertising Cost of Sales (ACoS) closely. ACoS is the ratio of ad spend to ad-attributed sales. An ACoS below 30% is generally profitable for activity books. An ACoS above 50% indicates your ads are not cost-effective and need optimization.

Bid strategically on keywords. High-competition keywords (like "sudoku book") cost more per click but reach a broader audience. Long-tail keywords (like "easy sudoku puzzles large print seniors") cost less and often convert at higher rates. Balance your campaign between broad and specific keywords for optimal results.`,
    },
  ],

  actionSteps: [
    {
      step: 'Choose Your First Book Format',
      description: 'Decide on your trim size (8.5 x 11 for worksheets, 6 x 9 for puzzle books), page count (80 to 120 pages is ideal for a first book), and whether to use color or black-and-white interior. Download the KDP cover template for your specifications.',
    },
    {
      step: 'Create Your Book Interior',
      description: 'Use worksheet generators to batch-create 80 to 100 pages of content including answer keys. Format as a single PDF at 300 DPI matching your selected trim size. Include a title page, table of contents, and about-the-author page.',
    },
    {
      step: 'Design Your Book Cover',
      description: 'Create a professional cover using Canva or a similar tool. Include a clear title, sample content preview, age/difficulty indicator, and bold colors that stand out at thumbnail size. Use the KDP cover template to ensure proper dimensions.',
    },
    {
      step: 'Research Keywords and Categories',
      description: 'Use Amazon\u2019s search suggestions and competitor analysis to identify 7 keyword phrases. Browse Amazon\u2019s category tree to find 2 to 4 relevant categories with manageable competition levels (top book BSR above 30,000).',
    },
    {
      step: 'Publish and Launch',
      description: 'Upload your manuscript and cover to KDP. Enter your keywords, select categories, and set competitive pricing. Announce your launch on social media and to any email subscribers. Drive concentrated sales in the first 72 hours.',
    },
    {
      step: 'Start Your Second Book Immediately',
      description: 'Begin creating your second book within a week of publishing your first. Target a related topic or difficulty level to build series momentum. Consistent publishing builds catalog depth and cross-promotion opportunities.',
    },
  ],

  toolsRecommended: [
    {
      appId: 'sudoku',
      title: 'Sudoku Generator',
      description: 'Create sudoku puzzles across multiple difficulty levels for the proven adult puzzle book market. A single session can produce enough puzzles for a complete KDP book with answer keys.',
    },
    {
      appId: 'wordsearch',
      title: 'Word Search Generator',
      description: 'Generate word search puzzles with configurable grids and automatic answer keys. Word search books are a top-performing KDP category with consistent year-round demand.',
    },
    {
      appId: 'crossword',
      title: 'Crossword Puzzle Generator',
      description: 'Build crossword puzzles for educational and entertainment activity books. Crossword books serve both children and adult audiences on Amazon.',
    },
    {
      appId: 'math-worksheet',
      title: 'Math Worksheet Generator',
      description: 'Produce math practice pages for educational workbooks targeting elementary students. Math workbooks are a steady KDP category with strong back-to-school demand.',
    },
    {
      appId: 'coloring',
      title: 'Coloring Page Generator',
      description: 'Create themed coloring pages for KDP coloring books. One of the highest-volume activity book categories on Amazon with broad age appeal.',
    },
  ],

  faq: [
    {
      question: 'How much does it cost to publish on Amazon KDP?',
      answer: 'Publishing on Amazon KDP is completely free. There are no upfront fees for publishing, listing, or printing. Amazon deducts the printing cost from your book\u2019s sale price and pays you the remaining royalty. Your only investment is the time to create the manuscript and cover.',
    },
    {
      question: 'How much can I earn from a single KDP activity book?',
      answer: 'A well-optimized activity book priced at $7.99 earns approximately $2.50 in royalties per sale. A book selling 5 copies per day generates about $375 per month. Top-performing activity books can sell 20+ copies per day, earning $1,500+ per month from a single title. Most publishers build catalogs of 20 to 50+ books for significant income.',
    },
    {
      question: 'What page count works best for KDP activity books?',
      answer: 'The sweet spot for most activity books is 80 to 120 pages including answer keys. This range provides enough content to justify a $6.99 to $9.99 price point while keeping printing costs manageable. Puzzle books for adults can go higher (150 to 200 pages) because enthusiasts value more content per book.',
    },
    {
      question: 'Do I need to use an ISBN for KDP books?',
      answer: 'Amazon provides a free ISBN for KDP paperbacks. You can also use your own ISBN if you prefer. The free Amazon-assigned ISBN restricts distribution to Amazon\u2019s platform only. Using your own ISBN allows you to list the book through additional distributors. For most activity book publishers, the free Amazon ISBN is sufficient.',
    },
    {
      question: 'How long does KDP review take before my book goes live?',
      answer: 'KDP typically reviews and approves new manuscripts within 24 to 72 hours. During this review, Amazon checks for formatting compliance, content policy adherence, and image quality. If your manuscript meets all requirements, it goes live automatically. If issues are found, Amazon provides specific feedback for correction.',
    },
    {
      question: 'Can I update my book after publishing?',
      answer: 'Yes. You can update your manuscript, cover, description, keywords, and pricing at any time through your KDP dashboard. Updates to the interior and cover typically take 24 to 48 hours to process. Keyword and description changes take effect within a few hours. Frequent major updates can temporarily affect your search ranking.',
    },
    {
      question: 'How much do individual apps and bundles cost?',
      answer: 'Individual worksheet generator apps are available at two tiers: $27 for a Commercial License (sell what you create, 3 language packs) and $47 for Full Access (all 11 languages, 104 image themes, priority support). Category bundles are $79 for Commercial and $119 for Full Access. Every app is free to try with all features \u2014 the free version adds a small watermark to exports.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'complete-guide-printable-business', pageType: 'guide', anchorText: 'Complete printable business guide' },
    { slug: 'etsy-printable-business', pageType: 'guide', anchorText: 'Selling printables on Etsy' },
    { slug: 'printable-business-income', pageType: 'guide', anchorText: 'Printable business income expectations' },
    { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'scaling-printable-business', pageType: 'guide', anchorText: 'Scaling your printable business' },
  ],
};
