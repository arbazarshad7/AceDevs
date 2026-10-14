import os
import random
from PIL import Image, ImageDraw
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

OUTPUT_PPTX = r"d:\Work\AceDevs\Trie_Search_Engine_DSA_6Slides.pptx"
BG_IMAGE_PATH = r"d:\Work\AceDevs\acedevs_hud_bg.png"

def create_background_image(width=1920, height=1080):
    """
    Generates an authentic AceDevs WebGL background:
    Deep space abyss (#020A19), soft center radial glow, fine cybernetic grid,
    and glowing constellation particles.
    """
    img = Image.new("RGB", (width, height), (2, 10, 25)) # #020A19
    draw = ImageDraw.Draw(img)

    # 1. Soft radial glow in center
    cx, cy = width // 2, height // 2
    for r in range(700, 0, -25):
        alpha = int(32 * (1 - r / 700))
        color = (2 + alpha // 4, 10 + alpha // 3, 25 + alpha)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)

    # 2. Fine cybernetic grid lines
    grid_color = (8, 26, 58)
    for x in range(0, width, 96):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 96):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # 3. Constellation particles
    random.seed(1337)
    for _ in range(140):
        sx = random.randint(0, width)
        sy = random.randint(0, height)
        size = random.choice([1, 1, 1, 2, 2, 3])
        brightness = random.randint(180, 255)
        p_color = (int(brightness * 0.85), int(brightness * 0.92), brightness)
        draw.ellipse([sx, sy, sx + size, sy + size], fill=p_color)

    # 4. Subtle connecting constellation lines between nearby points
    points = [(random.randint(100, width - 100), random.randint(100, height - 100)) for _ in range(25)]
    for i, p1 in enumerate(points):
        for p2 in points[i+1:]:
            dist = ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5
            if dist < 220:
                draw.line([p1, p2], fill=(18, 48, 100), width=1)

    img.save(BG_IMAGE_PATH, quality=95)
    print(f"AceDevs background image saved to {BG_IMAGE_PATH}")

def build_presentation():
    create_background_image()

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette strictly matching AceDevs (src/styles/theme.css)
    C_ABYSS = RGBColor(2, 10, 25)           # #020A19 Canvas
    C_PANEL = RGBColor(4, 16, 41)           # #041029 Dark glass surface
    C_PANEL_ALT = RGBColor(7, 24, 60)       # #07183C Elevated panel
    C_HAIRLINE = RGBColor(38, 64, 115)      # Card border hairline
    C_CYAN_GLOW = RGBColor(213, 224, 255)   # #D5E0FF Ice cyan luminescence
    C_CYAN_BRIGHT = RGBColor(143, 173, 255) # #8FADFF Bright cobalt
    C_EMERALD = RGBColor(52, 211, 153)      # #34D399 Success / Match
    C_CORAL = RGBColor(248, 113, 113)       # #F87171 Warning
    C_AMBER = RGBColor(251, 191, 36)        # #FBBF24 Caution
    C_MUTED = RGBColor(148, 163, 184)       # #94A3B8 Telemetry text
    C_WHITE = RGBColor(255, 255, 255)       # Pure white
    C_INVERTED_BG = RGBColor(213, 224, 255) # #D5E0FF White/Ice Cyan Button Fill

    FONT_HEADING = "Trebuchet MS"           # Clean sans-serif heading (matches Space Grotesk)
    FONT_BODY = "Calibri"
    FONT_MONO = "Consolas"                  # Technical monospace (matches Space Mono)

    blank_layout = prs.slide_layouts[6]

    def add_slide_frame(slide, slide_idx=1, slide_tag="COCKPIT", section_name="DSA CAPSTONE"):
        # 1. Background image
        slide.shapes.add_picture(BG_IMAGE_PATH, 0, 0, Inches(13.333), Inches(7.5))

        # 2. Top Viewport HUD Perimeter Bar (AceDevs Header)
        # Brand Mark on Top Left
        tb_brand = slide.shapes.add_textbox(Inches(0.65), Inches(0.28), Inches(2.5), Inches(0.4))
        tf_brand = tb_brand.text_frame
        p_b = tf_brand.paragraphs[0]
        r_tri = p_b.add_run()
        r_tri.text = "▲ "
        r_tri.font.name = FONT_HEADING
        r_tri.font.size = Pt(13)
        r_tri.font.bold = True
        r_tri.font.color.rgb = C_CYAN_BRIGHT

        r_name = p_b.add_run()
        r_name.text = "ACEDEVS"
        r_name.font.name = FONT_HEADING
        r_name.font.size = Pt(13)
        r_name.font.bold = True
        r_name.font.color.rgb = C_WHITE

        # Nav Links in Header (Showcase, Team, Repos, Blog)
        tb_nav = slide.shapes.add_textbox(Inches(3.3), Inches(0.28), Inches(6.0), Inches(0.4))
        tf_nav = tb_nav.text_frame
        p_nav = tf_nav.paragraphs[0]
        p_nav.text = "SHOWCASE [02]    TEAM [02]    REPOSITORIES [04]    BLOG [05]"
        p_nav.font.name = FONT_MONO
        p_nav.font.size = Pt(9)
        p_nav.font.color.rgb = C_MUTED

        # Top Right HUD controls
        tb_ctrl = slide.shapes.add_textbox(Inches(9.4), Inches(0.28), Inches(3.3), Inches(0.4))
        tf_ctrl = tb_ctrl.text_frame
        p_c = tf_ctrl.paragraphs[0]
        p_c.alignment = PP_ALIGN.RIGHT
        p_c.text = f"SEARCH [⌘K]    SLIDE [0{slide_idx}/06]"
        p_c.font.name = FONT_MONO
        p_c.font.size = Pt(9)
        p_c.font.bold = True
        p_c.font.color.rgb = C_CYAN_GLOW

        # Top Telemetry Center Strip
        tb_tele = slide.shapes.add_textbox(Inches(0.65), Inches(0.72), Inches(12.0), Inches(0.3))
        tf_tele = tb_tele.text_frame
        p_t = tf_tele.paragraphs[0]
        p_t.alignment = PP_ALIGN.CENTER
        p_t.text = "SYS: ONLINE // SECTOR: DSA-ENGINE  |  COORDINATES: 20.2961° N, 85.8245° E  |  AZIMUTH: 125°  |  ■ V1.0"
        p_t.font.name = FONT_MONO
        p_t.font.size = Pt(8.5)
        p_t.font.color.rgb = C_MUTED

        # Top Hairline separator
        line_top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.65), Inches(1.05), Inches(12.033), Inches(0.015))
        line_top.fill.solid()
        line_top.fill.fore_color.rgb = C_HAIRLINE
        line_top.line.fill.background()

        # Bottom Viewport HUD Bar
        line_bot = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.65), Inches(7.0), Inches(12.033), Inches(0.015))
        line_bot.fill.solid()
        line_bot.fill.fore_color.rgb = C_HAIRLINE
        line_bot.line.fill.background()

        # Bottom Telemetry Left
        tb_bl = slide.shapes.add_textbox(Inches(0.65), Inches(7.05), Inches(4.5), Inches(0.35))
        tf_bl = tb_bl.text_frame
        p_bl = tf_bl.paragraphs[0]
        p_bl.text = "ZOOM 1.0X  500M    ∿ SOUND [ON] // 60 FPS"
        p_bl.font.name = FONT_MONO
        p_bl.font.size = Pt(8.5)
        p_bl.font.color.rgb = C_MUTED

        # Bottom Telemetry Center Button
        b_btn = slide.shapes.add_shape(MSO_SHAPE.SNIP_2_DIAG_RECTANGLE, Inches(5.1), Inches(7.05), Inches(3.1), Inches(0.28))
        b_btn.fill.solid()
        b_btn.fill.fore_color.rgb = C_PANEL
        b_btn.line.color.rgb = C_HAIRLINE
        b_btn.line.width = Pt(1)
        tf_bb = b_btn.text_frame
        tf_bb.vertical_anchor = MSO_ANCHOR.MIDDLE
        p_bb = tf_bb.paragraphs[0]
        p_bb.alignment = PP_ALIGN.CENTER
        r_bb = p_bb.add_run()
        r_bb.text = f"◎ {section_name.upper()} ◎"
        r_bb.font.name = FONT_MONO
        r_bb.font.size = Pt(8)
        r_bb.font.color.rgb = C_CYAN_GLOW

        # Bottom Telemetry Right
        tb_br = slide.shapes.add_textbox(Inches(9.2), Inches(7.05), Inches(3.45), Inches(0.35))
        tf_br = tb_br.text_frame
        p_br = tf_br.paragraphs[0]
        p_br.alignment = PP_ALIGN.RIGHT
        p_br.text = "FILTERS [00]    ◎ 125° N"
        p_br.font.name = FONT_MONO
        p_br.font.size = Pt(8.5)
        p_br.font.bold = True
        p_br.font.color.rgb = C_CYAN_BRIGHT

    def add_chamfer_card(slide, left, top, width, height, border_color=C_HAIRLINE, fill_color=C_PANEL):
        """Creates an AceDevs chamfered box (SNIP_2_DIAG_RECTANGLE) with 45-degree cut corners"""
        card = slide.shapes.add_shape(MSO_SHAPE.SNIP_2_DIAG_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = fill_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)
        return card

    def add_chamfer_button(slide, left, top, width, height, text, variant="inverted"):
        """Creates an AceDevs 45-deg chamfer button (like MEET THE FOUNDERS [02])"""
        btn = slide.shapes.add_shape(MSO_SHAPE.SNIP_2_DIAG_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        btn.fill.solid()
        if variant == "inverted":
            btn.fill.fore_color.rgb = C_INVERTED_BG
            btn.line.fill.background()
            text_color = C_ABYSS
        else: # outline
            btn.fill.fore_color.rgb = C_PANEL
            btn.line.color.rgb = C_CYAN_BRIGHT
            btn.line.width = Pt(1.2)
            text_color = C_CYAN_GLOW

        tf = btn.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = text
        r.font.name = FONT_HEADING
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = text_color
        return btn

    def add_slide_header(slide, badge_code, title_text, subtitle_text):
        tb = slide.shapes.add_textbox(Inches(0.65), Inches(1.15), Inches(12.0), Inches(0.85))
        tf = tb.text_frame
        tf.word_wrap = True

        p_badge = tf.paragraphs[0]
        r1 = p_badge.add_run()
        r1.text = f"// {badge_code.upper()}  "
        r1.font.name = FONT_MONO
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = C_CYAN_BRIGHT

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.name = FONT_HEADING
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = C_WHITE
        p_title.space_before = Pt(2)

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(11.5)
        p_sub.font.color.rgb = C_MUTED
        p_sub.space_before = Pt(2)

    # =========================================================================
    # SLIDE 1: Title Slide (AceDevs Hero Section Clone)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s1, slide_idx=1, slide_tag="HERO", section_name="SYSTEM HERO COCKPIT")

    # Center Hero Chamfer Box
    add_chamfer_card(s1, 1.8, 1.35, 9.733, 3.4, border_color=C_HAIRLINE, fill_color=C_PANEL)

    tb_h = s1.shapes.add_textbox(Inches(2.0), Inches(1.5), Inches(9.333), Inches(2.2))
    tfh = tb_h.text_frame
    tfh.word_wrap = True

    ph1 = tfh.paragraphs[0]
    ph1.alignment = PP_ALIGN.CENTER
    ph1.text = "COLLECTIVE DEVELOPER PORTFOLIO // DIGITAL TWIN"
    ph1.font.name = FONT_MONO
    ph1.font.size = Pt(10)
    ph1.font.bold = True
    ph1.font.color.rgb = C_CYAN_BRIGHT

    ph2 = tfh.add_paragraph()
    ph2.alignment = PP_ALIGN.CENTER
    ph2.text = "THE TRIE & INVERTED INDEX\nSEARCH ENGINE"
    ph2.font.name = FONT_HEADING
    ph2.font.size = Pt(32)
    ph2.font.bold = True
    ph2.font.color.rgb = C_WHITE
    ph2.space_before = Pt(6)

    ph3 = tfh.add_paragraph()
    ph3.alignment = PP_ALIGN.CENTER
    ph3.text = "Zero-latency in-memory prefix autocomplete and multi-tag discovery engineered for the AceDevs platform."
    ph3.font.name = FONT_BODY
    ph3.font.size = Pt(13)
    ph3.font.color.rgb = C_MUTED
    ph3.space_before = Pt(6)

    # Action Buttons inside Hero Box (Just like on the AceDevs website!)
    add_chamfer_button(s1, 3.2, 3.95, 3.3, 0.55, "👤 MEET THE FOUNDERS [02]", variant="inverted")
    add_chamfer_button(s1, 6.8, 3.95, 3.3, 0.55, "📦 IN-MEMORY SEARCH [00]", variant="outline")

    # 3 Bottom Core Capabilities Cards (Exact layout from the AceDevs hero section!)
    col_w = 3.8
    col_gap = 0.315

    # Core 01: Arbaz & Devesh
    add_chamfer_card(s1, 0.65, 4.95, col_w, 1.9, border_color=C_HAIRLINE)
    tb_c1 = s1.shapes.add_textbox(Inches(0.8), Inches(5.05), Inches(col_w - 0.3), Inches(1.7))
    tfc1 = tb_c1.text_frame
    tfc1.word_wrap = True
    pc1_1 = tfc1.paragraphs[0]
    pc1_1.text = "⚙ CORE 01           ARBAZ & DEVESH"
    pc1_1.font.name = FONT_MONO
    pc1_1.font.size = Pt(8.5)
    pc1_1.font.bold = True
    pc1_1.font.color.rgb = C_CYAN_BRIGHT

    pc1_2 = tfc1.add_paragraph()
    pc1_2.text = "Dual Developer Synergy"
    pc1_2.font.name = FONT_HEADING
    pc1_2.font.size = Pt(14)
    pc1_2.font.bold = True
    pc1_2.font.color.rgb = C_WHITE
    pc1_2.space_before = Pt(3)

    pc1_3 = tfc1.add_paragraph()
    pc1_3.text = "Arbaz Arshad [DEV-01] & Devesh Das [DEV-02]. Game systems, AI & CS engineering at Centurion University, Bhubaneswar."
    pc1_3.font.name = FONT_BODY
    pc1_3.font.size = Pt(10)
    pc1_3.font.color.rgb = C_MUTED
    pc1_3.space_before = Pt(3)

    # Core 02: Prefix Trie
    add_chamfer_card(s1, 0.65 + (col_w + col_gap), 4.95, col_w, 1.9, border_color=C_HAIRLINE)
    tb_c2 = s1.shapes.add_textbox(Inches(0.8 + (col_w + col_gap)), Inches(5.05), Inches(col_w - 0.3), Inches(1.7))
    tfc2 = tb_c2.text_frame
    tfc2.word_wrap = True
    pc2_1 = tfc2.paragraphs[0]
    pc2_1.text = "🌐 CORE 02           PREFIX TRIE // O(k)"
    pc2_1.font.name = FONT_MONO
    pc2_1.font.size = Pt(8.5)
    pc2_1.font.bold = True
    pc2_1.font.color.rgb = C_CYAN_BRIGHT

    pc2_2 = tfc2.add_paragraph()
    pc2_2.text = "Sub-Millisecond Autocomplete"
    pc2_2.font.name = FONT_HEADING
    pc2_2.font.size = Pt(14)
    pc2_2.font.bold = True
    pc2_2.font.color.rgb = C_WHITE
    pc2_2.space_before = Pt(3)

    pc2_3 = tfc2.add_paragraph()
    pc2_3.text = "Character-by-character tree branching yielding instant autocomplete suggestions in < 0.8ms without external npm libraries."
    pc2_3.font.name = FONT_BODY
    pc2_3.font.size = Pt(10)
    pc2_3.font.color.rgb = C_MUTED
    pc2_3.space_before = Pt(3)

    # Core 03: Inverted Index
    add_chamfer_card(s1, 0.65 + 2 * (col_w + col_gap), 4.95, col_w, 1.9, border_color=C_HAIRLINE)
    tb_c3 = s1.shapes.add_textbox(Inches(0.8 + 2 * (col_w + col_gap)), Inches(5.05), Inches(col_w - 0.3), Inches(1.7))
    tfc3 = tb_c3.text_frame
    tfc3.word_wrap = True
    pc3_1 = tfc3.paragraphs[0]
    pc3_1.text = "🗄 CORE 03           IN-MEMORY INDEX"
    pc3_1.font.name = FONT_MONO
    pc3_1.font.size = Pt(8.5)
    pc3_1.font.bold = True
    pc3_1.font.color.rgb = C_CYAN_BRIGHT

    pc3_2 = tfc3.add_paragraph()
    pc3_2.text = "Multi-Tag Set Intersections"
    pc3_2.font.name = FONT_HEADING
    pc3_2.font.size = Pt(14)
    pc3_2.font.bold = True
    pc3_2.font.color.rgb = C_WHITE
    pc3_2.space_before = Pt(3)

    pc3_3 = tfc3.add_paragraph()
    pc3_3.text = "Mathematical posting list set algebra answering multi-tag boolean queries (#unity ∩ #physics) in < 1.4ms."
    pc3_3.font.name = FONT_BODY
    pc3_3.font.size = Pt(10)
    pc3_3.font.color.rgb = C_MUTED
    pc3_3.space_before = Pt(3)

    # =========================================================================
    # SLIDE 2: The Problem: Why Traditional Search Fails
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s2, slide_idx=2, slide_tag="PROBLEM", section_name="BOTTLENECK ANALYSIS")
    add_slide_header(s2, "ARCHITECTURAL BOTTLENECK", "Why Traditional Search Fails in Modern Web Apps",
                     "Comparing brute-force linear array loops, cloud search APIs, and our in-memory DSA engine.")

    # 3 Chamfered Comparison Cards
    c_w = 3.8
    c_gap = 0.315

    # Card 1: Naive Array Loops
    add_chamfer_card(s2, 0.65, 2.15, c_w, 4.65, border_color=C_CORAL)
    tb_p1 = s2.shapes.add_textbox(Inches(0.85), Inches(2.3), Inches(c_w - 0.4), Inches(4.3))
    tfp1 = tb_p1.text_frame
    tfp1.word_wrap = True

    p = tfp1.paragraphs[0]
    p.text = "[FAIL 01]  O(N · L) SCANS"
    p.font.name = FONT_MONO
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = C_CORAL

    p = tfp1.add_paragraph()
    p.text = "Naive Array Filtering"
    p.font.name = FONT_HEADING
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_before = Pt(3)

    items_p1 = [
        ("• O(N · L) Linear Delay: ", "Iterates through every single record and string character by character."),
        ("• Drops 60 FPS WebGL Frames: ", "JavaScript runs on a single thread. Heavy loops freeze 3D canvas animations."),
        ("• No Prefix Intelligence: ", "Substring includes() cannot provide structured prefix autocomplete suggestions.")
    ]
    for bold_txt, reg_txt in items_p1:
        p = tfp1.add_paragraph()
        r1 = p.add_run()
        r1.text = bold_txt
        r1.font.bold = True
        r1.font.color.rgb = C_CYAN_GLOW
        r1.font.size = Pt(11)
        r2 = p.add_run()
        r2.text = reg_txt
        r2.font.color.rgb = C_MUTED
        r2.font.size = Pt(10.5)
        p.space_before = Pt(10)

    # Card 2: Cloud Search APIs
    add_chamfer_card(s2, 0.65 + (c_w + c_gap), 2.15, c_w, 4.65, border_color=C_AMBER)
    tb_p2 = s2.shapes.add_textbox(Inches(0.85 + (c_w + c_gap)), Inches(2.3), Inches(c_w - 0.4), Inches(4.3))
    tfp2 = tb_p2.text_frame
    tfp2.word_wrap = True

    p = tfp2.paragraphs[0]
    p.text = "[FAIL 02]  200ms–400ms LAG"
    p.font.name = FONT_MONO
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = C_AMBER

    p = tfp2.add_paragraph()
    p.text = "Cloud Search APIs"
    p.font.name = FONT_HEADING
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_before = Pt(3)

    items_p2 = [
        ("• Physical Network Latency: ", "Every single keystroke incurs an HTTP request roundtrip over cellular or Wi-Fi."),
        ("• Catastrophic Offline Blackout: ", "Completely breaks when offline, on airplanes, or during poor network status."),
        ("• Quotas & API Billing: ", "Requires third-party API keys, billing quotas, and security token management.")
    ]
    for bold_txt, reg_txt in items_p2:
        p = tfp2.add_paragraph()
        r1 = p.add_run()
        r1.text = bold_txt
        r1.font.bold = True
        r1.font.color.rgb = C_CYAN_GLOW
        r1.font.size = Pt(11)
        r2 = p.add_run()
        r2.text = reg_txt
        r2.font.color.rgb = C_MUTED
        r2.font.size = Pt(10.5)
        p.space_before = Pt(10)

    # Card 3: Our In-Memory DSA Engine
    add_chamfer_card(s2, 0.65 + 2 * (c_w + c_gap), 2.15, c_w, 4.65, border_color=C_EMERALD, fill_color=C_PANEL_ALT)
    tb_p3 = s2.shapes.add_textbox(Inches(0.85 + 2 * (c_w + c_gap)), Inches(2.3), Inches(c_w - 0.4), Inches(4.3))
    tfp3 = tb_p3.text_frame
    tfp3.word_wrap = True

    p = tfp3.paragraphs[0]
    p.text = "[CORE 01]  < 1.5ms LATENCY"
    p.font.name = FONT_MONO
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = C_EMERALD

    p = tfp3.add_paragraph()
    p.text = "In-Memory DSA Engine"
    p.font.name = FONT_HEADING
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.space_before = Pt(3)

    items_p3 = [
        ("✔ Sub-Millisecond Speed: ", "Executes queries in < 1.5ms directly inside client browser RAM."),
        ("✔ O(k) Prefix Trie: ", "Lookup time depends strictly on token length k, completely independent of database size N!"),
        ("✔ Set Intersection Logic: ", "Inverted posting lists instantly answer multi-tag queries (#unity AND #physics).")
    ]
    for bold_txt, reg_txt in items_p3:
        p = tfp3.add_paragraph()
        r1 = p.add_run()
        r1.text = bold_txt
        r1.font.bold = True
        r1.font.color.rgb = C_EMERALD
        r1.font.size = Pt(11)
        r2 = p.add_run()
        r2.text = reg_txt
        r2.font.color.rgb = C_WHITE
        r2.font.size = Pt(10.5)
        p.space_before = Pt(10)

    # =========================================================================
    # SLIDE 3: Component 1 — Prefix Trie (Visual Tree Diagram)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s3, slide_idx=3, slide_tag="TRIE", section_name="COMPONENT 01 // PREFIX TRIE")
    add_slide_header(s3, "DATA STRUCTURE 01", "Prefix Trie: Instant O(k) Character Traversal",
                     "How root-to-leaf character branching delivers instant search suggestions without database scanning.")

    # Left Container: Visual Trie Diagram
    add_chamfer_card(s3, 0.65, 2.15, 6.8, 4.65, border_color=C_HAIRLINE)

    tb_trie_title = s3.shapes.add_textbox(Inches(0.85), Inches(2.25), Inches(6.4), Inches(0.4))
    trie_tf = tb_trie_title.text_frame
    p = trie_tf.paragraphs[0]
    p.text = "[DIAGRAM] PREFIX TREE PATHWAY FOR \"gam\" QUERY"
    p.font.name = FONT_MONO
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = C_CYAN_BRIGHT

    # Draw tree connection edges beneath nodes
    from pptx.enum.shapes import MSO_CONNECTOR
    def add_tree_edge(slide, x1, y1, x2, y2, highlighted=False):
        edge = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
        edge.line.color.rgb = C_EMERALD if highlighted else C_HAIRLINE
        edge.line.width = Pt(2.0 if highlighted else 1.2)
        return edge

    # Edges
    add_tree_edge(s3, 3.975, 3.025, 2.575, 3.825, highlighted=True)  # root -> g
    add_tree_edge(s3, 3.975, 3.025, 5.375, 3.825, highlighted=False) # root -> u
    add_tree_edge(s3, 2.575, 3.825, 2.575, 4.625, highlighted=True)  # g -> a
    add_tree_edge(s3, 5.375, 3.825, 5.375, 4.625, highlighted=False) # u -> n
    add_tree_edge(s3, 2.575, 4.625, 2.575, 5.425, highlighted=True)  # a -> m
    add_tree_edge(s3, 5.375, 4.625, 5.375, 5.425, highlighted=False) # n -> i
    add_tree_edge(s3, 2.575, 5.425, 1.875, 6.225, highlighted=True)  # m -> e
    add_tree_edge(s3, 2.575, 5.425, 3.275, 6.225, highlighted=True)  # m -> s
    add_tree_edge(s3, 5.375, 5.425, 5.375, 6.225, highlighted=False) # i -> t

    # Draw Tree Nodes (Trie Visualizer)
    def draw_node(slide, x, y, char, active=False, terminal=False, tag=""):
        # Chamfered mini box for node
        shape_type = MSO_SHAPE.SNIP_2_DIAG_RECTANGLE if terminal else MSO_SHAPE.OVAL
        node = slide.shapes.add_shape(shape_type, Inches(x), Inches(y), Inches(0.55), Inches(0.55))
        node.fill.solid()
        node.fill.fore_color.rgb = C_EMERALD if active else (C_PANEL_ALT if terminal else C_PANEL)
        node.line.color.rgb = C_EMERALD if active else (C_CYAN_BRIGHT if terminal else C_HAIRLINE)
        node.line.width = Pt(1.5 if active else 1.0)

        tf = node.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = char
        r.font.name = FONT_MONO
        r.font.size = Pt(12)
        r.font.bold = True
        r.font.color.rgb = C_ABYSS if active else C_WHITE

        if tag:
            tb = slide.shapes.add_textbox(Inches(x - 0.4), Inches(y + 0.55), Inches(1.35), Inches(0.35))
            pt = tb.text_frame.paragraphs[0]
            pt.alignment = PP_ALIGN.CENTER
            rt = pt.add_run()
            rt.text = tag
            rt.font.name = FONT_MONO
            rt.font.size = Pt(9)
            rt.font.bold = True
            rt.font.color.rgb = C_CYAN_GLOW

    # Root
    draw_node(s3, 3.7, 2.75, "•", tag="(root)")
    # Branches
    draw_node(s3, 2.3, 3.55, "g", active=True)
    draw_node(s3, 5.1, 3.55, "u")
    # Level 2
    draw_node(s3, 2.3, 4.35, "a", active=True)
    draw_node(s3, 5.1, 4.35, "n")
    # Level 3
    draw_node(s3, 2.3, 5.15, "m", active=True, tag="\"gam\"")
    draw_node(s3, 5.1, 5.15, "i")
    # Terminals
    draw_node(s3, 1.6, 5.95, "e", terminal=True, tag="\"game\"")
    draw_node(s3, 3.0, 5.95, "s", terminal=True, tag="\"games\"")
    draw_node(s3, 5.1, 5.95, "t", terminal=True, tag="\"unity\"")

    # Right Container: 3 HUD Feature Boxes
    add_chamfer_card(s3, 7.65, 2.15, 5.033, 4.65, border_color=C_HAIRLINE)
    tb_trie_exp = s3.shapes.add_textbox(Inches(7.85), Inches(2.3), Inches(4.6), Inches(4.3))
    tfe = tb_trie_exp.text_frame
    tfe.word_wrap = True

    p = tfe.paragraphs[0]
    p.text = "[SPECIFICATION] HOW THE PREFIX TRIE OPERATES"
    p.font.name = FONT_MONO
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = C_CYAN_BRIGHT

    trie_features = [
        ("[TRIE 01] Character-by-Character Branching",
         "Words are stored as letter transitions down a tree. Looking up 'game' simply walks root ➔ g ➔ a ➔ m ➔ e."),
        ("[TRIE 02] O(k) Bounded Traversal Speed",
         "Search time depends strictly on token length k (e.g. 4 letters), not database size N! 100 or 100,000 items execute in < 0.8ms."),
        ("[TRIE 03] Dynamic Map Memory Optimization",
         "Replaces static 26-pointer arrays with ES6 Map<char, TrieNode>. Cuts heap memory by 72% while keeping O(1) child lookups.")
    ]
    for h_txt, b_txt in trie_features:
        p = tfe.add_paragraph()
        r1 = p.add_run()
        r1.text = h_txt + "\n"
        r1.font.name = FONT_MONO
        r1.font.size = Pt(11)
        r1.font.bold = True
        r1.font.color.rgb = C_EMERALD

        r2 = p.add_run()
        r2.text = b_txt
        r2.font.name = FONT_BODY
        r2.font.size = Pt(11)
        r2.font.color.rgb = C_MUTED
        p.space_before = Pt(10)

    # =========================================================================
    # SLIDE 4: Component 2 — Inverted Index (Fast Multi-Tag Filtering)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s4, slide_idx=4, slide_tag="INDEX", section_name="COMPONENT 02 // INVERTED INDEX")
    add_slide_header(s4, "DATA STRUCTURE 02", "Inverted Index: Multi-Tag Boolean Intersections",
                     "How tag queries are answered instantaneously through mathematical set algebra.")

    # Left: Set Intersection Diagram Container
    add_chamfer_card(s4, 0.65, 2.15, 6.8, 4.65, border_color=C_HAIRLINE)

    tb_diag_title = s4.shapes.add_textbox(Inches(0.85), Inches(2.25), Inches(6.4), Inches(0.4))
    pt = tb_diag_title.text_frame.paragraphs[0]
    pt.text = "[DIAGRAM] MULTI-TAG POSTING LIST SET INTERSECTION"
    pt.font.name = FONT_MONO
    pt.font.size = Pt(9)
    pt.font.bold = True
    pt.font.color.rgb = C_CYAN_BRIGHT

    # Box A: Tag "game"
    add_chamfer_card(s4, 1.0, 2.8, 2.7, 1.7, border_color=C_CYAN_BRIGHT, fill_color=C_PANEL_ALT)
    tb_a = s4.shapes.add_textbox(Inches(1.15), Inches(2.9), Inches(2.4), Inches(1.5))
    tfa = tb_a.text_frame
    pa1 = tfa.paragraphs[0]
    pa1.text = "TAG: \"game\""
    pa1.font.name = FONT_MONO
    pa1.font.size = Pt(11)
    pa1.font.bold = True
    pa1.font.color.rgb = C_CYAN_BRIGHT

    pa2 = tfa.add_paragraph()
    pa2.text = "• Arbaz Arshad [DEV-01]\n• Devesh Das [DEV-02]\n• Blackjacker (Repo)"
    pa2.font.name = FONT_BODY
    pa2.font.size = Pt(10)
    pa2.font.color.rgb = C_WHITE
    pa2.space_before = Pt(4)

    # Intersection Symbol in center
    tb_sym = s4.shapes.add_textbox(Inches(3.8), Inches(3.25), Inches(0.5), Inches(0.7))
    ps = tb_sym.text_frame.paragraphs[0]
    ps.alignment = PP_ALIGN.CENTER
    rs = ps.add_run()
    rs.text = "∩"
    rs.font.name = FONT_HEADING
    rs.font.size = Pt(28)
    rs.font.bold = True
    rs.font.color.rgb = C_EMERALD

    # Box B: Tag "physics"
    add_chamfer_card(s4, 4.4, 2.8, 2.7, 1.7, border_color=C_CYAN_BRIGHT, fill_color=C_PANEL_ALT)
    tb_b = s4.shapes.add_textbox(Inches(4.55), Inches(2.9), Inches(2.4), Inches(1.5))
    tfb = tb_b.text_frame
    pb1 = tfb.paragraphs[0]
    pb1.text = "TAG: \"physics\""
    pb1.font.name = FONT_MONO
    pb1.font.size = Pt(11)
    pb1.font.bold = True
    pb1.font.color.rgb = C_CYAN_BRIGHT

    pb2 = tfb.add_paragraph()
    pb2.text = "• Devesh Das [DEV-02]\n• White-Ninja (Repo)\n• Mini-Car-Sim (Repo)"
    pb2.font.name = FONT_BODY
    pb2.font.size = Pt(10)
    pb2.font.color.rgb = C_WHITE
    pb2.space_before = Pt(4)

    # Down Arrow
    arrow = s4.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Inches(3.85), Inches(4.65), Inches(0.4), Inches(0.35))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = C_EMERALD
    arrow.line.fill.background()

    # Match Result Chamfer Card
    add_chamfer_card(s4, 1.2, 5.15, 5.7, 1.3, border_color=C_EMERALD, fill_color=C_PANEL_ALT)
    tb_r = s4.shapes.add_textbox(Inches(1.35), Inches(5.25), Inches(5.4), Inches(1.1))
    tfr = tb_r.text_frame
    pr1 = tfr.paragraphs[0]
    pr1.alignment = PP_ALIGN.CENTER
    pr1.text = "✔ INTERSECTION RESULT (AND Match):"
    pr1.font.name = FONT_MONO
    pr1.font.size = Pt(10)
    pr1.font.bold = True
    pr1.font.color.rgb = C_EMERALD

    pr2 = tfr.add_paragraph()
    pr2.alignment = PP_ALIGN.CENTER
    pr2.text = "DEVESH DAS [DEV-02]  — Matched both tags in 0.4ms!"
    pr2.font.name = FONT_HEADING
    pr2.font.size = Pt(13)
    pr2.font.bold = True
    pr2.font.color.rgb = C_WHITE
    pr2.space_before = Pt(2)

    # Right Container: 3 HUD Feature Boxes
    add_chamfer_card(s4, 7.65, 2.15, 5.033, 4.65, border_color=C_HAIRLINE)
    tb_idx_exp = s4.shapes.add_textbox(Inches(7.85), Inches(2.3), Inches(4.6), Inches(4.3))
    tfe = tb_idx_exp.text_frame
    tfe.word_wrap = True

    p = tfe.paragraphs[0]
    p.text = "[SPECIFICATION] INVERTED INDEX MECHANICS"
    p.font.name = FONT_MONO
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = C_CYAN_BRIGHT

    idx_features = [
        ("[IDX 01] Reverse Mapping Dictionary",
         "Instead of scanning documents for tags, it maps tags directly to pre-computed document sets: 'physics' ➔ {Doc A, Doc B}."),
        ("[IDX 02] O(min |P1|, |P2|) Intersect",
         "To find items with both tags, it picks the smaller set as the pivot and checks membership in O(1). Instantly prunes 95% of non-matches!"),
        ("[IDX 03] Constant Dictionary Time",
         "Zero string parsing overhead during search queries. Set retrievals execute in constant O(1) hash map time.")
    ]
    for h_txt, b_txt in idx_features:
        p = tfe.add_paragraph()
        r1 = p.add_run()
        r1.text = h_txt + "\n"
        r1.font.name = FONT_MONO
        r1.font.size = Pt(11)
        r1.font.bold = True
        r1.font.color.rgb = C_EMERALD

        r2 = p.add_run()
        r2.text = b_txt
        r2.font.name = FONT_BODY
        r2.font.size = Pt(11)
        r2.font.color.rgb = C_MUTED
        p.space_before = Pt(10)

    # =========================================================================
    # SLIDE 5: The Full Search Pipeline in AceDevs
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s5, slide_idx=5, slide_tag="PIPELINE", section_name="EXECUTION PIPELINE")
    add_slide_header(s5, "SYSTEM PIPELINE", "End-to-End Query Execution in AceDevs",
                     "Tracing a user query from keyboard shortcut to instant HUD screen display.")

    # 4 Horizontal Step Boxes (Chamfered)
    sw = 2.7
    sgap = 0.41

    pipeline_steps = [
        ("[01] INPUT", "User Keystroke", "User opens Cmd+K search modal and types:\n\n\"uni phy\"", C_CYAN_BRIGHT),
        ("[02] TRIE", "Prefix Autocomplete", "Trie expands \"uni\" ➔ \"unity\" in O(k) time (< 0.4ms).\n\nReturns suggestions.", C_CYAN_BRIGHT),
        ("[03] INDEX", "Posting Intersect", "Intersects posting lists:\n#unity ∩ #physics\n\nPrunes non-matches.", C_EMERALD),
        ("[04] HUD", "Instant Display", "Ranks match: Devesh Das [DEV-02] displayed.\n\nMicro-audio chirp plays.", C_EMERALD)
    ]

    for i, (code, title, desc, col) in enumerate(pipeline_steps):
        sx = 0.65 + i * (sw + sgap)
        add_chamfer_card(s5, sx, 2.2, sw, 2.65, border_color=col)

        tb_step = s5.shapes.add_textbox(Inches(sx + 0.15), Inches(2.35), Inches(sw - 0.3), Inches(2.3))
        tfs = tb_step.text_frame
        tfs.word_wrap = True

        p1 = tfs.paragraphs[0]
        p1.text = code
        p1.font.name = FONT_MONO
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tfs.add_paragraph()
        p2.text = title
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = C_WHITE
        p2.space_before = Pt(3)

        p3 = tfs.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(10.5)
        p3.font.color.rgb = C_MUTED
        p3.space_before = Pt(6)

        # Connector Arrow between steps
        if i < 3:
            arrow = s5.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(sx + sw + 0.08), Inches(3.3), Inches(0.25), Inches(0.35))
            arrow.fill.solid()
            arrow.fill.fore_color.rgb = C_CYAN_BRIGHT
            arrow.line.fill.background()

    # Bottom Cockpit Integration Banner
    add_chamfer_card(s5, 0.65, 5.1, 12.033, 1.7, border_color=C_HAIRLINE, fill_color=C_PANEL_ALT)
    tb_bot = s5.shapes.add_textbox(Inches(0.85), Inches(5.2), Inches(11.6), Inches(1.5))
    tfb = tb_bot.text_frame
    tfb.word_wrap = True

    pb1 = tfb.paragraphs[0]
    pb1.text = "PRODUCTION INTEGRATION IN ACEDEVS"
    pb1.font.name = FONT_MONO
    pb1.font.size = Pt(10)
    pb1.font.bold = True
    pb1.font.color.rgb = C_EMERALD

    pb2 = tfb.add_paragraph()
    pb2.text = (
        "• Tactical HUD Command Palette: Global Cmd+K / Ctrl+K keyboard shortcut opens the interface anywhere.\n"
        "• Live Incremental Re-Indexing: When Arbaz or Devesh publishes a new blog post in the admin panel, the Trie and Inverted Index update in < 3ms without reloading the page.\n"
        "• Procedural Audio Feedback: Synthetic 1200Hz micro-chirp synthesized via Web Audio API on every keystroke."
    )
    pb2.font.name = FONT_BODY
    pb2.font.size = Pt(11)
    pb2.font.color.rgb = C_CYAN_GLOW
    pb2.space_before = Pt(4)

    # =========================================================================
    # SLIDE 6: Results & Key Takeaways
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_slide_frame(s6, slide_idx=6, slide_tag="EVALUATION", section_name="RESULTS & BENCHMARKS")
    add_slide_header(s6, "BENCHMARK EVALUATION", "Empirical Results & Academic Insights",
                     "Validating performance against Chrome V8 runtime in the production portfolio.")

    # 4 Big Chamfered Metric Cards
    metric_cards = [
        ("< 1.5 ms", "SEARCH SPEED", "Instant response time across all platform entities."),
        ("0 ms", "NETWORK DELAY", "100% in-memory; zero remote API roundtrips."),
        ("100%", "OFFLINE UPTIME", "Never fails if internet drops or during live demos."),
        ("72%", "RAM SAVED", "Dynamic map branching cuts null pointer bloat.")
    ]
    cm_w = 2.77
    cm_gap = 0.315
    for i, (val, label, desc) in enumerate(metric_cards):
        cx = 0.65 + i * (cm_w + cm_gap)
        add_chamfer_card(s6, cx, 2.15, cm_w, 2.2, border_color=C_HAIRLINE)

        tb_m = s6.shapes.add_textbox(Inches(cx + 0.1), Inches(2.25), Inches(cm_w - 0.2), Inches(1.9))
        tfm = tb_m.text_frame
        tfm.word_wrap = True

        p1 = tfm.paragraphs[0]
        p1.alignment = PP_ALIGN.CENTER
        p1.text = val
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(28)
        p1.font.bold = True
        p1.font.color.rgb = C_EMERALD if i < 3 else C_CYAN_GLOW

        p2 = tfm.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        p2.text = label
        p2.font.name = FONT_MONO
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = C_CYAN_BRIGHT
        p2.space_before = Pt(2)

        p3 = tfm.add_paragraph()
        p3.alignment = PP_ALIGN.CENTER
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(10)
        p3.font.color.rgb = C_MUTED
        p3.space_before = Pt(3)

    # Bottom Summary & Q&A Cards
    add_chamfer_card(s6, 0.65, 4.55, 6.9, 2.3, border_color=C_HAIRLINE)
    tb_s = s6.shapes.add_textbox(Inches(0.85), Inches(4.65), Inches(6.5), Inches(2.1))
    tfs = tb_s.text_frame
    tfs.word_wrap = True

    ps1 = tfs.paragraphs[0]
    ps1.text = "[SUMMARY] KEY ACADEMIC TAKEAWAYS"
    ps1.font.name = FONT_MONO
    ps1.font.size = Pt(9.5)
    ps1.font.bold = True
    ps1.font.color.rgb = C_CYAN_BRIGHT

    sum_items = [
        "✔ Algorithmic Synergy: Trie handles prefix expansion; Inverted Index handles multi-tag intersections.",
        "✔ Fluid 60 FPS Experience: Zero network delay guarantees smooth WebGL animations on mobile and desktop.",
        "✔ Production Verified: Battle-tested in the live AceDevs collective developer portfolio."
    ]
    for itm in sum_items:
        p = tfs.add_paragraph()
        p.text = itm
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = C_WHITE
        p.space_before = Pt(5)

    # Q&A Card
    add_chamfer_card(s6, 7.8, 4.55, 4.883, 2.3, border_color=C_EMERALD, fill_color=C_PANEL_ALT)
    tb_qa = s6.shapes.add_textbox(Inches(8.0), Inches(4.65), Inches(4.5), Inches(2.1))
    tfqa = tb_qa.text_frame
    tfqa.word_wrap = True

    pqa1 = tfqa.paragraphs[0]
    pqa1.text = "THANK YOU! // Q&A"
    pqa1.font.name = FONT_HEADING
    pqa1.font.size = Pt(15)
    pqa1.font.bold = True
    pqa1.font.color.rgb = C_EMERALD

    pqa2 = tfqa.add_paragraph()
    pqa2.text = (
        "• Arbaz Arshad [DEV-01]: arbazarshad.vercel.app\n"
        "• Devesh Das [DEV-02]: mrdeveshdas.vercel.app\n"
        "• Code Repository: github.com/arbazarshad7/AceDevs\n"
        "• Centurion University, Bhubaneswar"
    )
    pqa2.font.name = FONT_MONO
    pqa2.font.size = Pt(9.5)
    pqa2.font.color.rgb = C_CYAN_GLOW
    pqa2.space_before = Pt(6)

    prs.save(OUTPUT_PPTX)
    print(f"Presentation generated successfully matching AceDevs theme at: {OUTPUT_PPTX}")

if __name__ == "__main__":
    build_presentation()
