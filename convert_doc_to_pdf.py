import os
import subprocess
import markdown
import re

MD_PATH = r"d:\Work\AceDevs\docs\TRIE_SEARCH_ENGINE_EXPLAINER.md"
HTML_PATH = r"d:\Work\AceDevs\docs\TRIE_SEARCH_ENGINE_EXPLAINER.html"
PDF_PATH_DOCS = r"d:\Work\AceDevs\docs\TRIE_SEARCH_ENGINE_EXPLAINER.pdf"
PDF_PATH_ROOT = r"d:\Work\AceDevs\Trie_Search_Engine_Explainer.pdf"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def build_pdf():
    print(f"Reading markdown from {MD_PATH}...")
    with open(MD_PATH, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Pre-process markdown if needed
    # Convert github style links to simple anchors or clean labels if local
    md_text = re.sub(r'file:///[a-zA-Z]:/[^\s\)]+', '#', md_text)

    # Convert Markdown to HTML
    html_content = markdown.markdown(
        md_text,
        extensions=['tables', 'fenced_code', 'toc']
    )

    # Executive HTML Document Template with KaTeX & Print Styles
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>The Trie & Inverted Index Search Engine — Explainer Manual</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- KaTeX for LaTeX Math -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
        onload="renderMathInElement(document.body, {{
            delimiters: [
                {{left: '$$', right: '$$', display: true}},
                {{left: '$', right: '$', display: false}}
            ],
            throwOnError: false
        }});"></script>

    <style>
        @page {{
            size: A4;
            margin: 18mm 16mm 18mm 16mm;
            @bottom-right {{
                content: counter(page);
                font-family: 'JetBrains Mono', monospace;
                font-size: 8pt;
                color: #64748b;
            }}
        }}

        *, *::before, *::after {{
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 9.8pt;
            line-height: 1.55;
            color: #1e293b;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}

        /* Document Header / Cover Banner */
        .doc-header-badge {{
            display: inline-block;
            background-color: #0f172a;
            color: #38bdf8;
            font-family: 'JetBrains Mono', monospace;
            font-size: 8pt;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 4px;
            margin-bottom: 12px;
        }}

        h1 {{
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-size: 21pt;
            font-weight: 800;
            line-height: 1.25;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 10px;
            border-bottom: 2.5px solid #0284c7;
            padding-bottom: 8px;
        }}

        h2 {{
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-size: 14pt;
            font-weight: 700;
            color: #0f172a;
            margin-top: 24px;
            margin-bottom: 10px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 5px;
            break-after: avoid;
        }}

        h3 {{
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-size: 11.5pt;
            font-weight: 700;
            color: #0369a1;
            margin-top: 18px;
            margin-bottom: 6px;
            break-after: avoid;
        }}

        h4 {{
            font-family: 'Inter', sans-serif;
            font-size: 10pt;
            font-weight: 700;
            color: #334155;
            margin-top: 12px;
            margin-bottom: 4px;
            break-after: avoid;
        }}

        p {{
            margin-top: 0;
            margin-bottom: 8px;
        }}

        /* Tables */
        table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 8.8pt;
            margin: 12px 0 16px 0;
            break-inside: avoid;
        }}

        th {{
            background-color: #0f172a;
            color: #f8fafc;
            font-weight: 600;
            text-align: left;
            padding: 7px 10px;
            border: 1px solid #0f172a;
        }}

        td {{
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
        }}

        tr:nth-child(even) td {{
            background-color: #f8fafc;
        }}

        /* Code Blocks & Inlines */
        pre {{
            background-color: #0b1329;
            color: #e2e8f0;
            font-family: 'JetBrains Mono', 'Space Mono', Consolas, monospace;
            font-size: 8pt;
            line-height: 1.45;
            padding: 10px 12px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 3px solid #38bdf8;
            margin: 10px 0 14px 0;
            break-inside: avoid;
        }}

        code {{
            font-family: 'JetBrains Mono', 'Space Mono', Consolas, monospace;
            font-size: 8.5pt;
            background-color: #f1f5f9;
            color: #0369a1;
            padding: 2px 4px;
            border-radius: 3px;
            border: 1px solid #e2e8f0;
        }}

        pre code {{
            background-color: transparent;
            color: inherit;
            padding: 0;
            border: none;
            font-size: inherit;
        }}

        /* Blockquotes / Speeches */
        blockquote {{
            background-color: #f0fdf4;
            border-left: 3.5px solid #10b981;
            color: #14532d;
            font-style: italic;
            margin: 10px 0 14px 0;
            padding: 8px 14px;
            border-radius: 0 4px 4px 0;
            break-inside: avoid;
        }}

        blockquote p {{
            margin: 0;
        }}

        /* Kbd badge */
        kbd {{
            display: inline-block;
            background-color: #e2e8f0;
            border: 1px solid #cbd5e1;
            border-radius: 3px;
            box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            font-weight: 600;
            padding: 1px 4px;
            color: #334155;
        }}

        /* Lists */
        ul, ol {{
            margin-top: 0;
            margin-bottom: 8px;
            padding-left: 20px;
        }}

        li {{
            margin-bottom: 4px;
        }}

        /* Break controls */
        .page-break {{
            page-break-before: always;
        }}

        hr {{
            border: none;
            border-top: 1px solid #cbd5e1;
            margin: 18px 0;
        }}

        /* Table of Contents */
        .toc {{
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px 18px;
            margin-bottom: 20px;
            break-inside: avoid;
        }}

        .toc ul {{
            margin-bottom: 0;
        }}

        a {{
            color: #0284c7;
            text-decoration: none;
        }}

        a:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <div class="doc-header-badge">CENTURION UNIVERSITY // CSE DEPARTMENT // DSA CAPSTONE SPECIFICATION</div>
    {html_content}
</body>
</html>
"""

    print(f"Writing styled HTML to {HTML_PATH}...")
    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(full_html)

    print("Launching headless Chrome to compile PDF...")
    cmd = [
        CHROME_PATH,
        "--headless",
        "--disable-gpu",
        "--allow-file-access-from-files",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=4000",
        f"--print-to-pdf={PDF_PATH_DOCS}",
        HTML_PATH
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(PDF_PATH_DOCS):
        size = os.path.getsize(PDF_PATH_DOCS)
        print(f"PDF generated successfully at: {PDF_PATH_DOCS} ({size:,} bytes)")
        
        # Also copy to root for instant access
        import shutil
        shutil.copyfile(PDF_PATH_DOCS, PDF_PATH_ROOT)
        print(f"Root copy created at: {PDF_PATH_ROOT}")
    else:
        print(f"Error compiling PDF: returncode={res.returncode}")
        print("Stderr:", res.stderr)

if __name__ == "__main__":
    build_pdf()
