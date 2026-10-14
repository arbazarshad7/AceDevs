import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_simple_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Theme Colors (Deep space navy, Ice Cyan, Mint Emerald, Coral, Slate)
    C_BG = RGBColor(2, 10, 25)            # #020A19 Deep space
    C_CARD = RGBColor(7, 24, 58)          # #07183A Elevated card
    C_CARD_ALT = RGBColor(11, 33, 77)     # #0B214D Dark blue container
    C_CARD_HIGHLIGHT = RGBColor(14, 45, 95)# Active highlighted card
    C_BORDER = RGBColor(38, 77, 138)      # Card border hairline
    C_BORDER_BRIGHT = RGBColor(96, 165, 250) # Vibrant cyan border
    C_CYAN_GLOW = RGBColor(213, 224, 255) # Ice Cyan text
    C_CYAN_BRIGHT = RGBColor(96, 165, 250)# Accent blue text
    C_EMERALD = RGBColor(52, 211, 153)    # Mint green success
    C_CORAL = RGBColor(248, 113, 113)     # Soft red/coral for warning
    C_AMBER = RGBColor(251, 191, 36)      # Soft amber for caution
    C_MUTED = RGBColor(148, 163, 184)     # Slate telemetry
    C_WHITE = RGBColor(255, 255, 255)

    FONT_HEADING = "Trebuchet MS"
    FONT_BODY = "Calibri"
    FONT_MONO = "Consolas"

    blank_layout = prs.slide_layouts[6]

    def set_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG
        bg.line.fill.background()
        return bg

    def add_header(slide, badge_text, title_text, subtitle_text):
        # Badge
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.42), Inches(3.4), Inches(0.32))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_CARD_ALT
        badge.line.color.rgb = C_BORDER_BRIGHT
        badge.line.width = Pt(1)
        tf_b = badge.text_frame
        tf_b.vertical_anchor = MSO_ANCHOR.MIDDLE
        p_b = tf_b.paragraphs[0]
        p_b.alignment = PP_ALIGN.CENTER
        r_b = p_b.add_run()
        r_b.text = f"// {badge_text.upper()}"
        r_b.font.name = FONT_MONO
        r_b.font.size = Pt(9.5)
        r_b.font.bold = True
        r_b.font.color.rgb = C_CYAN_BRIGHT

        # Title
        tb = slide.shapes.add_textbox(Inches(0.75), Inches(0.8), Inches(11.8), Inches(0.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.name = FONT_HEADING
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = C_CYAN_GLOW

        p2 = tf.add_paragraph()
        p2.text = subtitle_text
        p2.font.name = FONT_BODY
        p2.font.size = Pt(13)
        p2.font.color.rgb = C_MUTED
        p2.space_before = Pt(3)

        # Hairline
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.68), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = C_BORDER
        line.line.fill.background()

    def add_card(slide, left, top, width, height, title=None, border_color=C_BORDER, fill_color=C_CARD):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = fill_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)

        if title:
            tb = slide.shapes.add_textbox(Inches(left + 0.2), Inches(top + 0.15), Inches(width - 0.4), Inches(0.5))
            tf = tb.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = title
            p.font.name = FONT_HEADING
            p.font.size = Pt(14)
            p.font.bold = True
            p.font.color.rgb = C_CYAN_GLOW
        return card

    # =========================================================================
    # SLIDE 1: Title Slide (Clear, Sleek & Visual)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_bg(s1)

    # University header pill
    uni_badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(6.8), Inches(0.38))
    uni_badge.fill.solid()
    uni_badge.fill.fore_color.rgb = C_CARD_ALT
    uni_badge.line.color.rgb = C_BORDER_BRIGHT
    uni_badge.line.width = Pt(1)
    tf_u = uni_badge.text_frame
    tf_u.vertical_anchor = MSO_ANCHOR.MIDDLE
    pu = tf_u.paragraphs[0]
    pu.alignment = PP_ALIGN.CENTER
    ru = pu.add_run()
    ru.text = "CENTURION UNIVERSITY // CSE DEPARTMENT // DSA CAPSTONE"
    ru.font.name = FONT_MONO
    ru.font.size = Pt(10)
    ru.font.bold = True
    ru.font.color.rgb = C_CYAN_BRIGHT

    # Main Hero Box
    tb_main = s1.shapes.add_textbox(Inches(0.75), Inches(1.35), Inches(11.8), Inches(3.0))
    tf_m = tb_main.text_frame
    tf_m.word_wrap = True

    p0 = tf_m.paragraphs[0]
    p0.text = "DATA STRUCTURES & ALGORITHMS PROJECT"
    p0.font.name = FONT_MONO
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = C_EMERALD

    p_title = tf_m.add_paragraph()
    p_title.text = "The Trie & Inverted Index\nSearch Engine"
    p_title.font.name = FONT_HEADING
    p_title.font.size = Pt(38)
    p_title.font.bold = True
    p_title.font.color.rgb = C_CYAN_GLOW
    p_title.space_before = Pt(8)

    p_sub = tf_m.add_paragraph()
    p_sub.text = "Zero-latency in-memory prefix autocomplete and multi-tag discovery built for the AceDevs platform."
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(15)
    p_sub.font.color.rgb = C_MUTED
    p_sub.space_before = Pt(10)

    # 3 Bottom Info Cards
    # Card 1: Arbaz Arshad
    add_card(s1, 0.8, 4.8, 3.65, 1.85, border_color=C_BORDER_BRIGHT)
    tb_a = s1.shapes.add_textbox(Inches(0.95), Inches(4.95), Inches(3.35), Inches(1.5))
    tfa = tb_a.text_frame
    pa1 = tfa.paragraphs[0]
    pa1.text = "ARBAZ ARSHAD"
    pa1.font.name = FONT_HEADING
    pa1.font.size = Pt(16)
    pa1.font.bold = True
    pa1.font.color.rgb = C_WHITE

    pa2 = tfa.add_paragraph()
    pa2.text = "Lead Architect [DEV-01]\nGame Developer & Creative Technologist\nPortfolio: arbazarshad.vercel.app\nGitHub: arbazarshad7"
    pa2.font.name = FONT_BODY
    pa2.font.size = Pt(11)
    pa2.font.color.rgb = C_MUTED
    pa2.space_before = Pt(4)

    # Card 2: Devesh Das
    add_card(s1, 4.85, 4.8, 3.65, 1.85, border_color=C_BORDER_BRIGHT)
    tb_d = s1.shapes.add_textbox(Inches(5.0), Inches(4.95), Inches(3.35), Inches(1.5))
    tfd = tb_d.text_frame
    pd1 = tfd.paragraphs[0]
    pd1.text = "DEVESH DAS"
    pd1.font.name = FONT_HEADING
    pd1.font.size = Pt(16)
    pd1.font.bold = True
    pd1.font.color.rgb = C_WHITE

    pd2 = tfd.add_paragraph()
    pd2.text = "CS & Physics Engineer [DEV-02]\nGame Mechanics & Engines\nPortfolio: mrdeveshdas.vercel.app\nGitHub: ninja27dev"
    pd2.font.name = FONT_BODY
    pd2.font.size = Pt(11)
    pd2.font.color.rgb = C_MUTED
    pd2.space_before = Pt(4)

    # Card 3: Key Metrics Pill
    add_card(s1, 8.9, 4.8, 3.65, 1.85, border_color=C_EMERALD, fill_color=C_CARD_HIGHLIGHT)
    tb_k = s1.shapes.add_textbox(Inches(9.05), Inches(4.95), Inches(3.35), Inches(1.5))
    tfk = tb_k.text_frame
    pk1 = tfk.paragraphs[0]
    pk1.text = "KEY HIGHLIGHTS"
    pk1.font.name = FONT_HEADING
    pk1.font.size = Pt(15)
    pk1.font.bold = True
    pk1.font.color.rgb = C_EMERALD

    pk2 = tfk.add_paragraph()
    pk2.text = "⚡ < 1.5ms Query Latency\n🔒 100% Client-Side In-Memory\n📦 Zero NPM Search Dependencies\n🌐 100% Offline Resilient"
    pk2.font.name = FONT_MONO
    pk2.font.size = Pt(11)
    pk2.font.color.rgb = C_CYAN_GLOW
    pk2.space_before = Pt(4)

    # =========================================================================
    # SLIDE 2: Why We Built It (The Problem Diagram)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_bg(s2)
    add_header(s2, "The Problem", "Why Traditional Search Fails in Modern Web Apps",
               "Comparing standard array scans, remote cloud search APIs, and our in-memory DSA engine.")

    card_w = 3.65
    gap_x = 0.38

    # Col 1: Naive Array Loop (RED)
    add_card(s2, 0.8, 2.0, card_w, 4.9, "1. Naive Array Loops", border_color=C_CORAL)
    tb_c1 = s2.shapes.add_textbox(Inches(1.0), Inches(2.7), Inches(card_w - 0.4), Inches(4.0))
    tfc1 = tb_c1.text_frame
    tfc1.word_wrap = True

    badge1 = tfc1.paragraphs[0]
    badge1.text = "[ SLOW & INEFFICIENT ]"
    badge1.font.name = FONT_MONO
    badge1.font.size = Pt(10)
    badge1.font.bold = True
    badge1.font.color.rgb = C_CORAL
    badge1.space_after = Pt(10)

    p_c1_1 = tfc1.add_paragraph()
    p_c1_1.text = "❌ O(N · L) Time Complexity:\nScans every single item and letter one by one."
    p_c1_1.font.name = FONT_BODY
    p_c1_1.font.size = Pt(12)
    p_c1_1.font.color.rgb = C_MUTED
    p_c1_1.space_after = Pt(10)

    p_c1_2 = tfc1.add_paragraph()
    p_c1_2.text = "❌ Drops Animation Frames:\nFreezes browser main thread, causing 3D WebGL scenes to lag."
    p_c1_2.font.name = FONT_BODY
    p_c1_2.font.size = Pt(12)
    p_c1_2.font.color.rgb = C_MUTED
    p_c1_2.space_after = Pt(10)

    p_c1_3 = tfc1.add_paragraph()
    p_c1_3.text = "❌ No Prefix Intelligence:\nCannot autocomplete partial keystrokes like 'gam' ➔ 'games'."
    p_c1_3.font.name = FONT_BODY
    p_c1_3.font.size = Pt(12)
    p_c1_3.font.color.rgb = C_MUTED

    # Col 2: Cloud Search APIs (AMBER)
    add_card(s2, 0.8 + (card_w + gap_x), 2.0, card_w, 4.9, "2. Cloud Search APIs", border_color=C_AMBER)
    tb_c2 = s2.shapes.add_textbox(Inches(1.0 + (card_w + gap_x)), Inches(2.7), Inches(card_w - 0.4), Inches(4.0))
    tfc2 = tb_c2.text_frame
    tfc2.word_wrap = True

    badge2 = tfc2.paragraphs[0]
    badge2.text = "[ HIGH LATENCY & COST ]"
    badge2.font.name = FONT_MONO
    badge2.font.size = Pt(10)
    badge2.font.bold = True
    badge2.font.color.rgb = C_AMBER
    badge2.space_after = Pt(10)

    p_c2_1 = tfc2.add_paragraph()
    p_c2_1.text = "⚠️ 200ms–400ms Lag:\nEvery keystroke makes an HTTP network roundtrip to a remote server."
    p_c2_1.font.name = FONT_BODY
    p_c2_1.font.size = Pt(12)
    p_c2_1.font.color.rgb = C_MUTED
    p_c2_1.space_after = Pt(10)

    p_c2_2 = tfc2.add_paragraph()
    p_c2_2.text = "⚠️ Breaks Offline:\nIf the user loses internet connection, the search bar completely fails."
    p_c2_2.font.name = FONT_BODY
    p_c2_2.font.size = Pt(12)
    p_c2_2.font.color.rgb = C_MUTED
    p_c2_2.space_after = Pt(10)

    p_c2_3 = tfc2.add_paragraph()
    p_c2_3.text = "⚠️ Paid Quotas & Limits:\nRequires API keys, rate-limit handling, and recurring hosting costs."
    p_c2_3.font.name = FONT_BODY
    p_c2_3.font.size = Pt(12)
    p_c2_3.font.color.rgb = C_MUTED

    # Col 3: The Proposed DSA Solution (GREEN)
    add_card(s2, 0.8 + 2 * (card_w + gap_x), 2.0, card_w, 4.9, "3. Our In-Memory DSA Engine", border_color=C_EMERALD, fill_color=C_CARD_HIGHLIGHT)
    tb_c3 = s2.shapes.add_textbox(Inches(1.0 + 2 * (card_w + gap_x)), Inches(2.7), Inches(card_w - 0.4), Inches(4.0))
    tfc3 = tb_c3.text_frame
    tfc3.word_wrap = True

    badge3 = tfc3.paragraphs[0]
    badge3.text = "[ OPTIMAL SOLUTION ]"
    badge3.font.name = FONT_MONO
    badge3.font.size = Pt(10)
    badge3.font.bold = True
    badge3.font.color.rgb = C_EMERALD
    badge3.space_after = Pt(10)

    p_c3_1 = tfc3.add_paragraph()
    p_c3_1.text = "✔ Sub-Millisecond Speed:\nExecutes in < 1.5ms directly inside browser RAM."
    p_c3_1.font.name = FONT_BODY
    p_c3_1.font.size = Pt(12)
    p_c3_1.font.color.rgb = C_WHITE
    p_c3_1.space_after = Pt(10)

    p_c3_2 = tfc3.add_paragraph()
    p_c3_2.text = "✔ O(k) Prefix Trie:\nAutocomplete speed depends only on token length, not dataset size!"
    p_c3_2.font.name = FONT_BODY
    p_c3_2.font.size = Pt(12)
    p_c3_2.font.color.rgb = C_WHITE
    p_c3_2.space_after = Pt(10)

    p_c3_3 = tfc3.add_paragraph()
    p_c3_3.text = "✔ Inverted Index Intersect:\nInstant multi-tag boolean queries (e.g., #unity AND #physics)."
    p_c3_3.font.name = FONT_BODY
    p_c3_3.font.size = Pt(12)
    p_c3_3.font.color.rgb = C_WHITE

    # =========================================================================
    # SLIDE 3: Component 1 — Prefix Trie (Visual Tree Diagram)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_bg(s3)
    add_header(s3, "Component 01", "Prefix Trie: Instant O(k) Autocomplete",
               "Visualizing how character-by-character tree branching delivers sub-millisecond search suggestions.")

    # Left: The Visual Trie Diagram Container
    add_card(s3, 0.8, 2.0, 6.8, 4.9, "Trie Tree Structure Diagram", border_color=C_BORDER_BRIGHT)

    # Drawing the visual tree nodes!
    def draw_trie_node(slide, x, y, char, is_target=False, is_terminal=False, label=""):
        node = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(0.55), Inches(0.55))
        node.fill.solid()
        node.fill.fore_color.rgb = C_EMERALD if is_target else (RGBColor(30, 58, 138) if is_terminal else C_CARD_ALT)
        node.line.color.rgb = C_EMERALD if is_target else C_BORDER_BRIGHT
        node.line.width = Pt(1.5)
        tf = node.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        run = p.add_run()
        run.text = char
        run.font.name = FONT_MONO
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = C_BG if is_target else C_WHITE

        if label:
            tb = slide.shapes.add_textbox(Inches(x - 0.5), Inches(y + 0.55), Inches(1.55), Inches(0.35))
            tfl = tb.text_frame
            tfl.word_wrap = True
            pl = tfl.paragraphs[0]
            pl.alignment = PP_ALIGN.CENTER
            rl = pl.add_run()
            rl.text = label
            rl.font.name = FONT_MONO
            rl.font.size = Pt(9.5)
            rl.font.bold = True
            rl.font.color.rgb = C_CYAN_GLOW

    # Tree Nodes layout
    # Level 0 (Root)
    draw_trie_node(s3, 3.8, 2.7, "•", label="(root)")

    # Level 1 (Branches: 'g' and 'u')
    draw_trie_node(s3, 2.5, 3.5, "g", is_target=True)
    draw_trie_node(s3, 5.1, 3.5, "u")

    # Level 2 ('a' under 'g', 'n' under 'u')
    draw_trie_node(s3, 2.5, 4.3, "a", is_target=True)
    draw_trie_node(s3, 5.1, 4.3, "n")

    # Level 3 ('m' under 'a', 'i' under 'n')
    draw_trie_node(s3, 2.5, 5.1, "m", is_target=True, label="\"gam\" query")
    draw_trie_node(s3, 5.1, 5.1, "i")

    # Level 4 Terminal words ('e' under 'm' -> 'game', 't' under 'i' -> 'unity')
    draw_trie_node(s3, 1.8, 5.9, "e", is_terminal=True, label="\"game\"")
    draw_trie_node(s3, 3.2, 5.9, "s", is_terminal=True, label="\"games\"")
    draw_trie_node(s3, 5.1, 5.9, "t", is_terminal=True, label="\"unity\"")

    # Right: Simple 3-Point Explainer Card
    add_card(s3, 7.85, 2.0, 4.65, 4.9, "How The Trie Works", border_color=C_BORDER)
    tb_exp = s3.shapes.add_textbox(Inches(8.05), Inches(2.75), Inches(4.25), Inches(4.0))
    tfe = tb_exp.text_frame
    tfe.word_wrap = True

    pts = [
        ("1. Character-by-Character Branching",
         "Words are stored as letter paths down a tree. Looking up 'game' simply walks from root ➔ g ➔ a ➔ m ➔ e."),
        ("2. O(k) Bounded Traversal Speed",
         "Search time depends ONLY on word length k (e.g. 4 letters), completely independent of whether you have 100 or 100,000 documents!"),
        ("3. Instant Bounded Autocomplete",
         "Typing 'gam' immediately navigates to node 'm' and collects all downstream words ('game', 'games') in < 0.8ms.")
    ]
    for i, (title_str, body_str) in enumerate(pts):
        p = tfe.paragraphs[0] if i == 0 else tfe.add_paragraph()
        r1 = p.add_run()
        r1.text = title_str + "\n"
        r1.font.name = FONT_HEADING
        r1.font.size = Pt(13)
        r1.font.bold = True
        r1.font.color.rgb = C_EMERALD

        r2 = p.add_run()
        r2.text = body_str
        r2.font.name = FONT_BODY
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = C_MUTED
        p.space_after = Pt(14)

    # =========================================================================
    # SLIDE 4: Component 2 — Inverted Index (Visual Set Intersection)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_bg(s4)
    add_header(s4, "Component 02", "Inverted Index: Instant Multi-Tag Set Intersection",
               "How tag queries are answered instantaneously through mathematical set intersections.")

    # Left: Visual Set Intersection Diagram
    add_card(s4, 0.8, 2.0, 6.8, 4.9, "Multi-Tag Set Intersection Diagram", border_color=C_BORDER_BRIGHT)

    # Box A: Tag "game"
    card_a = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(2.7), Inches(2.6), Inches(1.8))
    card_a.fill.solid()
    card_a.fill.fore_color.rgb = C_CARD_ALT
    card_a.line.color.rgb = C_CYAN_BRIGHT
    card_a.line.width = Pt(1.5)
    tfa = card_a.text_frame
    tfa.word_wrap = True
    pa = tfa.paragraphs[0]
    pa.text = "TAG: \"game\""
    pa.font.name = FONT_MONO
    pa.font.size = Pt(11)
    pa.font.bold = True
    pa.font.color.rgb = C_CYAN_BRIGHT
    pa2 = tfa.add_paragraph()
    pa2.text = "• Arbaz Arshad [DEV-01]\n• Devesh Das [DEV-02]\n• Blackjacker (Repo)"
    pa2.font.name = FONT_BODY
    pa2.font.size = Pt(10.5)
    pa2.font.color.rgb = C_WHITE
    pa2.space_before = Pt(4)

    # Intersection Symbol in middle
    tb_sym = s4.shapes.add_textbox(Inches(3.85), Inches(3.2), Inches(0.7), Inches(0.8))
    tf_sym = tb_sym.text_frame
    ps = tf_sym.paragraphs[0]
    ps.alignment = PP_ALIGN.CENTER
    rs = ps.add_run()
    rs.text = "∩"
    rs.font.name = FONT_HEADING
    rs.font.size = Pt(28)
    rs.font.bold = True
    rs.font.color.rgb = C_EMERALD

    # Box B: Tag "physics"
    card_b = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.6), Inches(2.7), Inches(2.6), Inches(1.8))
    card_b.fill.solid()
    card_b.fill.fore_color.rgb = C_CARD_ALT
    card_b.line.color.rgb = C_CYAN_BRIGHT
    card_b.line.width = Pt(1.5)
    tfb = card_b.text_frame
    tfb.word_wrap = True
    pb = tfb.paragraphs[0]
    pb.text = "TAG: \"physics\""
    pb.font.name = FONT_MONO
    pb.font.size = Pt(11)
    pb.font.bold = True
    pb.font.color.rgb = C_CYAN_BRIGHT
    pb2 = tfb.add_paragraph()
    pb2.text = "• Devesh Das [DEV-02]\n• White-Ninja (Repo)\n• Mini-Car-Sim (Repo)"
    pb2.font.name = FONT_BODY
    pb2.font.size = Pt(10.5)
    pb2.font.color.rgb = C_WHITE
    pb2.space_before = Pt(4)

    # Arrow Down
    arrow = s4.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Inches(3.9), Inches(4.7), Inches(0.6), Inches(0.45))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = C_EMERALD
    arrow.line.fill.background()

    # Result Box (Exact Match Found!)
    card_res = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(5.3), Inches(5.4), Inches(1.2))
    card_res.fill.solid()
    card_res.fill.fore_color.rgb = C_CARD_HIGHLIGHT
    card_res.line.color.rgb = C_EMERALD
    card_res.line.width = Pt(2)
    tfr = card_res.text_frame
    tfr.word_wrap = True
    pr1 = tfr.paragraphs[0]
    pr1.alignment = PP_ALIGN.CENTER
    pr1.text = "✔ INTERSECTION RESULT (AND Match):"
    pr1.font.name = FONT_MONO
    pr1.font.size = Pt(11)
    pr1.font.bold = True
    pr1.font.color.rgb = C_EMERALD
    pr2 = tfr.add_paragraph()
    pr2.alignment = PP_ALIGN.CENTER
    pr2.text = "DEVESH DAS [DEV-02] — Matched both tags in 0.4ms!"
    pr2.font.name = FONT_HEADING
    pr2.font.size = Pt(13)
    pr2.font.bold = True
    pr2.font.color.rgb = C_WHITE
    pr2.space_before = Pt(2)

    # Right: Simple 3-Point Explainer Card
    add_card(s4, 7.85, 2.0, 4.65, 4.9, "Why Inverted Index Excels", border_color=C_BORDER)
    tb_exp2 = s4.shapes.add_textbox(Inches(8.05), Inches(2.75), Inches(4.25), Inches(4.0))
    tfe2 = tb_exp2.text_frame
    tfe2.word_wrap = True

    pts2 = [
        ("1. Reverse Mapping Dictionary",
         "Instead of scanning documents for words, it maps words directly to document sets: 'physics' ➔ {Doc A, Doc B}."),
        ("2. O(min |P1|, |P2|) Intersect",
         "To find items with both tags, it simply intersects the two sets. It iterates through the smaller set, instantly discarding 95% of non-matches."),
        ("3. Zero Scanning Overhead",
         "No nested loops, no string slicing. Lookups happen in constant dictionary time O(1).")
    ]
    for i, (title_str, body_str) in enumerate(pts2):
        p = tfe2.paragraphs[0] if i == 0 else tfe2.add_paragraph()
        r1 = p.add_run()
        r1.text = title_str + "\n"
        r1.font.name = FONT_HEADING
        r1.font.size = Pt(13)
        r1.font.bold = True
        r1.font.color.rgb = C_EMERALD

        r2 = p.add_run()
        r2.text = body_str
        r2.font.name = FONT_BODY
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = C_MUTED
        p.space_after = Pt(14)

    # =========================================================================
    # SLIDE 5: The Full Pipeline Flowchart (Step-by-Step)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_bg(s5)
    add_header(s5, "System Pipeline", "How It All Works Together in AceDevs",
               "Tracing a real query through the keystroke, Trie expansion, and inverted set intersection.")

    # 4 Horizontal Step Boxes
    step_w = 2.6
    step_gap = 0.44

    steps_data = [
        ("STEP 1", "User Keystroke", "User opens Cmd+K search modal and types:\n\n\"uni phy\"", C_CYAN_BRIGHT),
        ("STEP 2", "Prefix Trie", "Trie expands \"uni\" ➔ \"unity\" in O(k) time (< 0.4ms).\n\nReturns suggestions.", C_CYAN_BRIGHT),
        ("STEP 3", "Inverted Index", "Intersects posting lists:\n#unity ∩ #physics\n\nPrunes non-matches.", C_EMERALD),
        ("STEP 4", "Instant Display", "Ranks match: Devesh Das [DEV-02] displayed.\n\nMicro-audio chirp plays.", C_EMERALD)
    ]

    for i, (step_num, step_title, step_desc, color) in enumerate(steps_data):
        sx = 0.8 + i * (step_w + step_gap)
        add_card(s5, sx, 2.1, step_w, 2.7, border_color=color)

        tb_s = s5.shapes.add_textbox(Inches(sx + 0.15), Inches(2.25), Inches(step_w - 0.3), Inches(2.4))
        tfs = tb_s.text_frame
        tfs.word_wrap = True

        p_num = tfs.paragraphs[0]
        p_num.text = step_num
        p_num.font.name = FONT_MONO
        p_num.font.size = Pt(10)
        p_num.font.bold = True
        p_num.font.color.rgb = color

        p_t = tfs.add_paragraph()
        p_t.text = step_title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = C_WHITE
        p_t.space_before = Pt(3)

        p_d = tfs.add_paragraph()
        p_d.text = step_desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = C_MUTED
        p_d.space_before = Pt(6)

        # Connector arrow to next step
        if i < 3:
            arrow = s5.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(sx + step_w + 0.08), Inches(3.2), Inches(0.28), Inches(0.35))
            arrow.fill.solid()
            arrow.fill.fore_color.rgb = C_BORDER_BRIGHT
            arrow.line.fill.background()

    # Bottom Integration Banner
    add_card(s5, 0.8, 5.15, 11.733, 1.75, border_color=C_BORDER, fill_color=C_CARD_HIGHLIGHT)
    tb_bot = s5.shapes.add_textbox(Inches(1.0), Inches(5.25), Inches(11.3), Inches(1.5))
    tfb = tb_bot.text_frame
    tfb.word_wrap = True

    pb1 = tfb.paragraphs[0]
    pb1.text = "REAL-TIME PRODUCTION INTEGRATION IN ACEDEVS"
    pb1.font.name = FONT_MONO
    pb1.font.size = Pt(11)
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
    set_bg(s6)
    add_header(s6, "Summary & Impact", "Key Takeaways & Real-World Results",
               "Proving that classical data structures can outperform heavyweight cloud search architectures.")

    # 4 Big Stat Metric Badges
    metric_cards = [
        ("< 1.5 ms", "SEARCH SPEED", "Instant response time across entire database."),
        ("0 ms", "NETWORK DELAY", "100% in-memory; zero remote API roundtrips."),
        ("100%", "OFFLINE UPTIME", "Never fails if internet drops or during demos."),
        ("72%", "RAM SAVED", "Dynamic map branching cuts null pointer bloat.")
    ]
    card_mw = 2.7
    card_mgap = 0.3
    for i, (val_txt, lbl_txt, desc_txt) in enumerate(metric_cards):
        mx = 0.8 + i * (card_mw + card_mgap)
        add_card(s6, mx, 2.0, card_mw, 2.1, border_color=C_BORDER_BRIGHT)
        tb_m = s6.shapes.add_textbox(Inches(mx + 0.1), Inches(2.15), Inches(card_mw - 0.2), Inches(1.8))
        tfm = tb_m.text_frame
        tfm.word_wrap = True

        pm1 = tfm.paragraphs[0]
        pm1.alignment = PP_ALIGN.CENTER
        pm1.text = val_txt
        pm1.font.name = FONT_HEADING
        pm1.font.size = Pt(28)
        pm1.font.bold = True
        pm1.font.color.rgb = C_EMERALD if i < 3 else C_CYAN_GLOW

        pm2 = tfm.add_paragraph()
        pm2.alignment = PP_ALIGN.CENTER
        pm2.text = lbl_txt
        pm2.font.name = FONT_MONO
        pm2.font.size = Pt(10.5)
        pm2.font.bold = True
        pm2.font.color.rgb = C_CYAN_BRIGHT
        pm2.space_before = Pt(2)

        pm3 = tfm.add_paragraph()
        pm3.alignment = PP_ALIGN.CENTER
        pm3.text = desc_txt
        pm3.font.name = FONT_BODY
        pm3.font.size = Pt(10)
        pm3.font.color.rgb = C_MUTED
        pm3.space_before = Pt(3)

    # Bottom Summary & Q&A Cards
    add_card(s6, 0.8, 4.4, 6.8, 2.5, "Project Summary", border_color=C_BORDER)
    tb_s_bot = s6.shapes.add_textbox(Inches(1.0), Inches(4.9), Inches(6.4), Inches(1.8))
    tfsb = tb_s_bot.text_frame
    tfsb.word_wrap = True

    sum_points = [
        "✔ Algorithmic Synergy: Trie provides prefix expansion; Inverted Index handles multi-tag intersections.",
        "✔ Fluid 60 FPS Experience: Zero network delay guarantees smooth WebGL animations on mobile and desktop.",
        "✔ Production Verified: Battle-tested in the live AceDevs collective developer portfolio."
    ]
    for i, pt_txt in enumerate(sum_points):
        p = tfsb.paragraphs[0] if i == 0 else tfsb.add_paragraph()
        p.text = pt_txt
        p.font.name = FONT_BODY
        p.font.size = Pt(11.5)
        p.font.color.rgb = C_WHITE
        p.space_after = Pt(6)

    # Q&A Card
    add_card(s6, 7.9, 4.4, 4.633, 2.5, "Project Access & Q&A", border_color=C_EMERALD, fill_color=C_CARD_HIGHLIGHT)
    tb_qa = s6.shapes.add_textbox(Inches(8.1), Inches(4.85), Inches(4.2), Inches(1.9))
    tfqa = tb_qa.text_frame
    tfqa.word_wrap = True

    pq1 = tfqa.paragraphs[0]
    pq1.text = "THANK YOU! // Q&A"
    pq1.font.name = FONT_HEADING
    pq1.font.size = Pt(16)
    pq1.font.bold = True
    pq1.font.color.rgb = C_EMERALD

    pq2 = tfqa.add_paragraph()
    pq2.text = (
        "• Arbaz Arshad [DEV-01]: arbazarshad.vercel.app\n"
        "• Devesh Das [DEV-02]: mrdeveshdas.vercel.app\n"
        "• Code Repository: github.com/arbazarshad7/AceDevs\n"
        "• Centurion University, Bhubaneswar"
    )
    pq2.font.name = FONT_MONO
    pq2.font.size = Pt(10)
    pq2.font.color.rgb = C_CYAN_GLOW
    pq2.space_before = Pt(6)

    # Save output PPTX
    out_file = os.path.join(os.path.dirname(__file__), "Trie_Search_Engine_DSA_6Slides.pptx")
    prs.save(out_file)
    print(f"6-Slide Presentation created successfully at: {out_file}")

if __name__ == "__main__":
    build_simple_deck()
