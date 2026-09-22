import os
import shutil
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch

def generate_diagram():
    os.makedirs('architecture', exist_ok=True)

    # 16:9 aspect ratio: 28 x 15.75 inches at 300 DPI = 8400 x 4725 px
    fig, ax = plt.subplots(figsize=(28, 15.75), dpi=300)
    fig.patch.set_facecolor('#0A0E1A')  # Ultra-deep obsidian slate
    ax.set_facecolor('#0A0E1A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Color Palette - Enterprise Cloud Aesthetic
    bg_card = '#131B2A'
    border_card = '#24334A'
    text_main = '#FFFFFF'
    text_muted = '#94A3B8'
    accent_blue = '#38BDF8'      # Synchronous API / HTTP (Ice Cyan)
    accent_purple = '#A855F7'    # Event Mesh / Kafka (Amethyst)
    accent_emerald = '#10B981'   # Storage / Database R/W (Emerald)
    accent_amber = '#F59E0B'     # External Third-Party (Amber)
    accent_rose = '#F43F5E'      # Redis / Cache Lock (Rose)

    def draw_box(x, y, w, h, title="", subtitle="", color=bg_card, border=border_card, tag="", tag_color=accent_blue, radius=0.8):
        # Background card with rounded corners
        rect = FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad={radius},rounding_size={radius}",
                              facecolor=color, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(rect)

        # Prominent Title (Visual Hierarchy: high contrast & bold)
        if title:
            title_y = y + h - 1.6 if tag else y + h - 1.5
            ax.text(x + w / 2, title_y, title, ha='center', va='center',
                    fontsize=10.2, fontweight='bold', color=text_main, zorder=4)

        # Concise Subtitle (Architectural responsibilities, clean line spacing)
        if subtitle:
            sub_y = y + (h / 2) + (0.3 if tag else -0.3)
            ax.text(x + w / 2, sub_y, subtitle, ha='center', va='center',
                    fontsize=8.0, color=text_muted, zorder=4, linespacing=1.22)

        # Subtle Tech Pill Tag at bottom
        if tag:
            tag_w = min(w * 0.88, max(len(tag) * 0.52 + 1.6, 6.0))
            tag_rect = FancyBboxPatch((x + (w - tag_w) / 2, y + 0.6), tag_w, 1.35,
                                      boxstyle="round,pad=0.2,rounding_size=0.4",
                                      facecolor='#090D16', edgecolor=border, linewidth=1, zorder=3)
            ax.add_patch(tag_rect)
            ax.text(x + w / 2, y + 1.25, tag, ha='center', va='center',
                    fontsize=6.8, fontweight='bold', color=tag_color, zorder=4)

    def draw_banner(x, y, w, h, title="", subtitle="", color='#172554', border='#2563EB', radius=0.6):
        rect = FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad={radius},rounding_size={radius}",
                              facecolor=color, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(rect)
        ax.text(x + w / 2, y + h - 1.4, title, ha='center', va='center',
                fontsize=10.5, fontweight='black', color='#FFFFFF', zorder=4)
        ax.text(x + w / 2, y + 1.3, subtitle, ha='center', va='center',
                fontsize=8.0, color='#94A3B8', zorder=4)

    def draw_section(x, y, w, h, label, bg='#0C1220', border='#1C273C'):
        rect = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=1.0,rounding_size=1.0",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=1)
        ax.add_patch(rect)
        ax.text(x + 2.2, y + h - 1.5, label.upper(), fontsize=9.2, fontweight='bold',
                color='#64748B', zorder=2)

    def draw_arrow(x1, y1, x2, y2, color=accent_blue, style='->', ls='-', lw=2.0, label=""):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle=style, color=color, lw=lw, linestyle=ls,
                                   shrinkA=3, shrinkB=3, mutation_scale=14),
                    zorder=5)
        if label:
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            ax.text(mx, my + 0.5, label, ha='center', va='center', fontsize=7.2,
                    fontweight='bold', color=color,
                    bbox=dict(boxstyle='round,pad=0.25', facecolor='#0A0E1A', edgecolor='none', alpha=0.92),
                    zorder=6)

    # ==================== 1. HEADER ====================
    ax.text(50, 97.5, "ENTERPRISE VACATION RENTAL CLOUD PLATFORM ARCHITECTURE",
            ha='center', va='center', fontsize=18, fontweight='black', color='#FFFFFF', zorder=10)
    ax.text(50, 95.3, "Multi-AZ, Fault-Tolerant Microservices & Event-Driven Streaming Architecture",
            ha='center', va='center', fontsize=10.5, fontweight='semibold', color=accent_blue, zorder=10)

    # ==================== 2. TOP CROSS-CUTTING BARS ====================
    # Security & Governance
    draw_banner(3.0, 89.0, 29.5, 4.4, title="PERIMETER DEFENSE & IDENTITY SECURITY",
                subtitle="Cloudflare WAF Rules • Edge TLS 1.3 • Anti-DDoS Mitigation • OAuth 2.0 / JWT Auth • AWS KMS Secrets",
                color='#1B1647', border='#4F46E5')

    # Observability & Monitoring
    draw_banner(35.25, 89.0, 29.5, 4.4, title="FULL-STACK TELEMETRY & OBSERVABILITY",
                subtitle="OpenTelemetry Traces • Prometheus Metrics Scraping • Grafana Alerting • Centralized Log Shipper",
                color='#064E3B', border='#059669')

    # Infrastructure & Orchestration
    draw_banner(67.5, 89.0, 29.5, 4.4, title="CONTAINER RUNTIME & RELIABILITY",
                subtitle="Multi-AZ AWS EKS Cluster • Horizontal Pod Autoscaler (HPA) • ArgoCD GitOps • Terraform IaC",
                color='#15254A', border='#2563EB')

    # ==================== 3. SECTION 1: CLIENT & EDGE (x: 3 to 18) ====================
    draw_section(3.0, 50.5, 15.0, 36.5, "1. EDGE TIER & CLIENT TOUCHPOINTS")
    draw_box(4.2, 76.0, 12.6, 8.5, "Client Web Experience",
             "Progressive Web App (PWA)\nDesktop & Mobile Touchpoints\nHTTP/3 (QUIC) & HTTP/2 Delivery",
             tag="Client Interface")

    draw_box(4.2, 63.5, 12.6, 10.0, "Cloudflare Anycast CDN & WAF",
             "Global Anycast Edge Network\nDistributed Edge Caching\nLayer 3/4/7 DDoS Shield\nBot Defense & WAF Rulesets",
             tag="Edge Network & WAF", tag_color='#F97316')

    draw_box(4.2, 52.0, 12.6, 9.0, "Serverless Edge Handlers",
             "Edge Compute Runtime\nGeo-Targeted Content Routing\nDynamic Header Transformations",
             tag="Serverless Edge")

    # ==================== 4. SECTION 2: FRONTEND TIER (x: 20.5 to 35.5) ====================
    draw_section(20.5, 50.5, 15.0, 36.5, "2. PRESENTATION & ASSET TIER")
    draw_box(21.7, 72.0, 12.6, 12.5, "Next.js / SSR Cluster",
             "Containerized Node.js Fleet\nDynamic Listing Hydration\nIsomorphic Server-Side Rendering\nHorizontal Pod Autoscaling",
             tag="Kubernetes Fleet")

    draw_box(21.7, 52.0, 12.6, 9.0, "Static Asset Origin (S3)",
             "Immutable Pre-Rendered Pages\nOptimized JS / CSS Artifacts\nResponsive Visual Assets",
             tag="AWS S3 Origin")

    # ==================== 5. SECTION 3: INGRESS & API GATEWAY (x: 38 to 53) ====================
    draw_section(38.0, 50.5, 15.0, 36.5, "3. EDGE INGRESS & API ROUTING")
    draw_box(39.2, 76.0, 12.6, 8.5, "Envoy Ingress Gateway",
             "Centralized Ingress Proxy\nJWT Validation & Auth Guard\nDistributed Token Bucket Limiter",
             tag="Envoy / Kong Gateway")

    draw_box(39.2, 64.0, 12.6, 9.5, "High-Throughput Load Balancers",
             "AWS Multi-AZ NLB / ALB\nLayer 4 & Layer 7 Routing\nContinuous Endpoint Probing",
             tag="Multi-AZ Balancer")

    draw_box(39.2, 52.0, 12.6, 9.5, "Experience API / BFF Service",
             "Backend-for-Frontend Engine\nGraphQL & REST Aggregation\nClient Payload Tailoring",
             tag="BFF Layer")

    # ==================== 6. SECTION 4: CORE MICROSERVICES (x: 55.5 to 80) ====================
    draw_section(55.5, 50.5, 24.5, 36.5, "4. DOMAIN MICROSERVICES MESH")
    # Row 1
    draw_box(57.0, 76.0, 10.2, 8.2, "Identity & Auth", "OAuth 2.0 & OIDC Authority\nToken Rotation & Revocation", tag="Go / gRPC")
    draw_box(68.3, 76.0, 10.2, 8.2, "Property Catalog", "Listing Details & Metadata\nRoom Capacities & Amenities", tag="Java / Spring")
    # Row 2
    draw_box(57.0, 64.0, 10.2, 8.2, "Reservation Engine", "Atomic Booking Engine\nAvailability Calendar State", tag="Go / ACID")
    draw_box(68.3, 64.0, 10.2, 8.2, "User & Profile", "Guest Profiles & Identities\nSuperhost Verification Rules", tag="Node / gRPC")
    # Row 3 (Payment on right to seamlessly connect to Stripe!)
    draw_box(57.0, 52.0, 10.2, 8.2, "Reviews & Feedback", "Multi-Category Ratings\nVerified Guest Testimonials", tag="Java / Spring")
    draw_box(68.3, 52.0, 10.2, 8.2, "Financial & Checkout", "Dynamic Price Calculation\nMulti-Currency Escrow Engine", tag="PCI-DSS / Stripe")

    # ==================== 7. EXTERNAL INTEGRATIONS (x: 82.5 to 97) ====================
    draw_section(82.5, 50.5, 14.5, 36.5, "EXTERNAL INTEGRATIONS")
    draw_box(83.5, 71.0, 12.5, 13.5, "Payment Processing Gateway",
             "Stripe Payments Engine\n3D-Secure 2.0 Compliance\nAutomated Host Disbursements\nWebhook Callback Handlers",
             color='#29163B', border='#9333EA', tag="Stripe API", tag_color='#C084FC')

    draw_box(83.5, 52.0, 12.5, 13.5, "Communication Services",
             "Twilio SMS Dispatcher\nSendGrid / SES Email API\nMobile Push Gateway\nDelivery Status Webhooks",
             color='#142342', border='#2563EB', tag="External SaaS", tag_color='#60A5FA')

    # ==================== 8. SECTION 5: PERSISTENCE & CACHING (x: 3 to 49.5) ====================
    draw_section(3.0, 5.0, 46.5, 42.5, "5. DATA PERSISTENCE & ACCELERATION")
    # Primary DB
    draw_box(4.5, 27.5, 13.5, 17.5, "Primary Transactional DB",
             "AWS Aurora PostgreSQL Multi-AZ\nACID Transaction Engine\nReservation & Financial Ledger\nSub-Minute Automated Failover",
             color='#122133', border='#0284C7', tag="Aurora Master HA", tag_color='#38BDF8')

    # Read Replicas
    draw_box(19.5, 27.5, 13.5, 17.5, "Read-Replica DB Fleet",
             "3x Multi-AZ Read Replicas\nOffloads Catalog Reads & Reviews\nPgBouncer Connection Pooling\nHorizontal Query Scaling",
             color='#122133', border='#0284C7', tag="Read Replicas (x3)", tag_color='#38BDF8')

    # Redis Cache
    draw_box(34.5, 27.5, 13.5, 17.5, "In-Memory Redis Cluster",
             "Redis Enterprise In-Memory\nSession Storage & Rate Limits\nListing Details Hot-Cache\nDistributed Redlock Mutexes",
             color='#381522', border='#E11D48', tag="Sub-ms In-Memory", tag_color='#FB7185')

    # Object Storage
    draw_box(4.5, 7.0, 21.0, 18.0, "Media Object Storage (S3)",
             "High-Resolution Photos (WebP/AVIF)\nEncrypted Host Verification Documents\nCloudflare Origin with Pre-Signed URLs\nAutomated S3 Lifecycle Policies",
             color='#132738', border='#0284C7', tag="S3 Object Store", tag_color='#38BDF8')

    # Search Cluster
    draw_box(27.0, 7.0, 21.0, 18.0, "OpenSearch Discovery Fleet",
             "Distributed OpenSearch Cluster\nGeospatial Radius Queries (Candolim/Goa)\nFull-Text Amenities & Filter Queries\nReal-Time Date Availability Filtering",
             color='#102E25', border='#059669', tag="Search Engine", tag_color='#34D399')

    # ==================== 9. SECTION 6: ASYNC EVENT BUS & WORKERS (x: 52 to 97) ====================
    draw_section(52.0, 5.0, 45.0, 42.5, "6. ASYNC EVENT FABRIC & STREAM PROCESSORS")

    # Kafka Event Bus
    draw_box(53.5, 27.5, 42.0, 17.5, "Distributed Apache Kafka Event Mesh",
             "Topics: reservation.created • reservation.confirmed • payment.captured • review.posted • listing.updated\nPartitioned by Listing ID & User ID for Strict Sequential Ordering • Multi-AZ Managed Cluster",
             color='#26183E', border='#9333EA', tag="Pub/Sub Event Backbone", tag_color='#C084FC')

    # Workers (Search Sync placed adjacent to OpenSearch for direct non-crossing connector)
    draw_box(53.5, 7.0, 13.0, 18.0, "Search CDC Ingestion",
             "Change Data Capture (CDC)\nConsumes Postgres WAL Logs\nStreams Real-Time to Kafka\nNear-Zero Latency Sync\nUpdates OpenSearch Index",
             color='#1C2533', border='#4B5563', tag="CDC Engine / Debezium")

    draw_box(68.0, 7.0, 13.0, 18.0, "Media Transcoding Workers",
             "Async Media Processing\nGenerates Responsive Grid\nOptimized WebP Compression\nS3 Bucket Asset Storage\nCDN Cache Invalidation",
             color='#1C2533', border='#4B5563', tag="K8s Worker Fleet")

    draw_box(82.5, 7.0, 13.0, 18.0, "Notification Consumer Fleet",
             "Async Consumer Fleet\nDispatches Booking Confirms\nEmail Receipts (SendGrid)\nSMS Reminders (Twilio)\nPush Notification Queue",
             color='#1C2533', border='#4B5563', tag="K8s Worker Fleet")

    # ==================== 10. CLEAN FLOW CONNECTORS & ARROWS ====================
    # ── 1. SYNCHRONOUS REQUEST FLOW (CYAN / BLUE) ──
    # Client -> Cloudflare CDN
    draw_arrow(10.5, 76.0, 10.5, 73.5, color=accent_blue, lw=2.4, label="HTTPS / TLS 1.3")
    # CDN -> Edge Workers
    draw_arrow(10.5, 63.5, 10.5, 61.0, color=accent_blue, lw=1.8)
    # CDN -> Frontend (cache miss)
    draw_arrow(16.8, 68.5, 21.7, 76.5, color=accent_blue, lw=2.0, label="Cache Miss / SSR")
    # Frontend -> API Gateway
    draw_arrow(34.3, 78.5, 39.2, 80.0, color=accent_blue, lw=2.4, label="API Traffic")
    # API Gateway -> Load Balancer
    draw_arrow(45.5, 76.0, 45.5, 73.5, color=accent_blue, lw=2.0)
    # Load Balancer -> BFF
    draw_arrow(45.5, 64.0, 45.5, 61.5, color=accent_blue, lw=2.0)
    # BFF -> Microservices (Clean horizontal entrance)
    draw_arrow(51.8, 56.5, 57.0, 56.5, color=accent_blue, lw=2.2, label="gRPC / REST")

    # ── 2. EXTERNAL INTEGRATIONS (AMBER / ORANGE) ──
    # Payment Service (68.3, 52.0) -> Payment Gateway (83.5, 71.0)
    draw_arrow(78.5, 56.5, 83.5, 74.0, color=accent_amber, ls='-.', lw=2.2, label="Stripe API")
    # Notification Workers (89.0, 25.0) -> Notification SaaS (89.0, 52.0)
    draw_arrow(89.0, 25.0, 89.0, 52.0, color=accent_amber, ls='-.', lw=2.2, label="SMS / Email API")

    # ── 3. ASYNCHRONOUS EVENT FLOW (VIOLET / PURPLE) ──
    # Microservices -> Kafka Event Bus (Clean vertical downward arrow)
    draw_arrow(67.75, 52.0, 67.75, 45.0, color=accent_purple, ls='--', lw=2.4, label="Emit Domain Events")
    # Kafka -> Search Sync Pipeline
    draw_arrow(60.0, 27.5, 60.0, 25.0, color=accent_purple, ls='--', lw=2.0)
    # Kafka -> Image Pipeline Workers
    draw_arrow(74.5, 27.5, 74.5, 25.0, color=accent_purple, ls='--', lw=2.0)
    # Kafka -> Notification Workers
    draw_arrow(89.0, 27.5, 89.0, 25.0, color=accent_purple, ls='--', lw=2.0)

    # ── 4. PERSISTENCE, SEARCH & CACHING FLOW (EMERALD & ROSE) ──
    # Replication: Primary -> Replicas (Clean horizontal arrow)
    draw_arrow(18.0, 36.25, 19.5, 36.25, color=accent_emerald, ls='-', lw=2.4, label="Sync Replication")

    # Microservices -> Redis Enterprise Cache (Distributed locks & session hot-cache)
    draw_arrow(55.5, 51.5, 48.0, 44.0, color=accent_rose, ls='--', lw=2.0, label="Lock & Cache")

    # Microservices -> PostgreSQL Aurora Multi-AZ Cluster (ACID writes & read offload)
    draw_arrow(55.5, 54.0, 33.0, 44.0, color=accent_emerald, ls='-', lw=2.2, label="ACID Writes & Queries")

    # Search Sync CDC -> OpenSearch (Direct clean horizontal connector across gap)
    draw_arrow(53.5, 16.0, 48.0, 16.0, color=accent_emerald, ls='-', lw=2.2, label="CDC Index Sync")

    # ==================== 11. FLOW LEGEND ====================
    legend_y = 1.6
    ax.text(4.5, legend_y, "FLOW LEGEND:", fontsize=9.2, fontweight='black', color=text_main, va='center')

    # Legend 1: Sync Request Path (Cyan)
    ax.plot([14.5, 18.0], [legend_y, legend_y], color=accent_blue, lw=2.5)
    ax.text(18.8, legend_y, "Synchronous HTTPS / gRPC Traffic", fontsize=8.2, fontweight='medium', color=text_muted, va='center')

    # Legend 2: Async Event Path (Purple)
    ax.plot([38.5, 42.0], [legend_y, legend_y], color=accent_purple, lw=2.5, ls='--')
    ax.text(42.8, legend_y, "Asynchronous Kafka Event Streams", fontsize=8.2, fontweight='medium', color=text_muted, va='center')

    # Legend 3: Database & Cache Operations (Emerald)
    ax.plot([62.5, 66.0], [legend_y, legend_y], color=accent_emerald, lw=2.5, ls=':')
    ax.text(66.8, legend_y, "Database, Cache & Index Operations", fontsize=8.2, fontweight='medium', color=text_muted, va='center')

    # Legend 4: External Third-Party APIs (Amber)
    ax.plot([85.0, 88.5], [legend_y, legend_y], color=accent_amber, lw=2.5, ls='-.')
    ax.text(89.3, legend_y, "External Third-Party Service Integrations", fontsize=8.2, fontweight='medium', color=text_muted, va='center')

    # ==================== 12. EXPORT ASSETS ====================
    png_path = 'architecture/architecture-diagram.png'
    pdf_path = 'architecture/architecture-diagram.pdf'
    svg_path = 'architecture/architecture-diagram.svg'

    print(f"Exporting 16:9 high-resolution diagram to {png_path}...")
    plt.savefig(png_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')

    print(f"Exporting vector diagram to {pdf_path}...")
    plt.savefig(pdf_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')

    print(f"Exporting vector diagram to {svg_path}...")
    plt.savefig(svg_path, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')

    # Also mirror directly to root directory for top-level review
    root_png = 'architecture-diagram.png'
    root_pdf = 'architecture-diagram.pdf'
    print(f"Mirroring updated assets to root: {root_png} and {root_pdf}...")
    shutil.copyfile(png_path, root_png)
    shutil.copyfile(pdf_path, root_pdf)

    plt.close()
    print("All architecture diagram assets generated and synchronized successfully!")

if __name__ == '__main__':
    generate_diagram()
