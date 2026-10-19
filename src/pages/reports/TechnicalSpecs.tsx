import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Code,
  Database,
  Cloud,
  Shield,
  Zap,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";

const TechnicalSpecs = () => {
  const downloadPDF = () => {
    const content = `
EXAFRIK DIGITAL WALLET - TECHNICAL SPECIFICATIONS

System Architecture:
- Architecture: Microservices-based, event-driven
- Deployment: Multi-region cloud (AWS, Azure)
- Scalability: Horizontal auto-scaling
- High Availability: 99.99% uptime SLA
- Disaster Recovery: Multi-region failover

Technology Stack:

Frontend:
- Web: React 18, TypeScript, Next.js 14
- Mobile: React Native 0.73
- State Management: Redux Toolkit, React Query
- UI Framework: Tailwind CSS, shadcn/ui
- Build Tools: Vite, Webpack 5

Backend:
- API Gateway: Kong, AWS API Gateway
- Microservices: Node.js, Go, Python
- Real-time: WebSockets, Server-Sent Events
- Message Queue: RabbitMQ, AWS SQS
- Background Jobs: Bull, Node-cron

Database:
- Primary: PostgreSQL 15 (transaction data)
- Cache: Redis 7 (session, real-time data)
- Analytics: ClickHouse (event tracking)
- Search: Elasticsearch 8 (user search, logs)
- Backup: Automated hourly snapshots

Security:
- Authentication: OAuth 2.0, JWT, Biometric (Face ID, Touch ID)
- Encryption: AES-256 (data at rest), TLS 1.3 (data in transit)
- Key Management: AWS KMS, HashiCorp Vault
- Fraud Detection: ML-based anomaly detection
- Compliance: PCI DSS Level 1, GDPR, PSD2, local regulatory requirements
- DDoS Protection: Cloudflare, AWS Shield
- Penetration Testing: Quarterly third-party audits

Payment Integration:
- Mobile Money: M-Pesa, Airtel Money, MTN MoMo, Orange Money
- Card Processing: Visa, Mastercard via Stripe/Paystack
- Bank Transfer: Direct bank integration (25 banks)
- Crypto: Bitcoin, Ethereum, USDT (via partnerships)
- P2P: Instant peer-to-peer transfers

API Architecture:
- REST API: OpenAPI 3.0 spec
- GraphQL: Apollo Server
- Webhooks: Event-driven notifications
- Rate Limiting: Token bucket algorithm (100 req/min)
- Versioning: URL-based (/v1/, /v2/)
- Documentation: Swagger UI, Postman collections

Performance:
- API Response Time: < 200ms (p95)
- Transaction Processing: < 3 seconds end-to-end
- Concurrent Users: 100,000+ simultaneous
- Throughput: 10,000 transactions per second
- Database Queries: < 50ms (p99)

Monitoring & Observability:
- APM: New Relic, Datadog
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- Metrics: Prometheus, Grafana
- Error Tracking: Sentry
- Uptime Monitoring: PingDOM, StatusPage

DevOps:
- CI/CD: GitHub Actions, Jenkins
- Infrastructure as Code: Terraform, AWS CloudFormation
- Container Orchestration: Kubernetes (EKS)
- Container Registry: AWS ECR, Docker Hub
- Configuration Management: Ansible

Mobile Features:
- Offline Mode: Local SQLite storage with sync
- Push Notifications: FCM (Android), APNs (iOS)
- Biometric Auth: Face ID, Touch ID, fingerprint
- QR Code: Scan to pay, receive payments
- Deep Linking: Universal links, app links
- Background Sync: Automatic transaction sync

Compliance & Certifications:
✓ PCI DSS Level 1 Certified
✓ ISO 27001:2013 (Information Security)
✓ SOC 2 Type II
✓ GDPR Compliant
✓ PSD2 Compliant (Europe)
✓ CBN Licensed (Central Bank of Nigeria)
✓ KYC/AML Compliant

Data Privacy:
- User data encryption at rest and in transit
- Minimal data collection (privacy by design)
- Right to be forgotten (GDPR Article 17)
- Data portability (export in JSON/CSV)
- Third-party audit trails
- Regular security training for staff

Scalability Plan:
Current: 500K users, 12K TPS
6 months: 2M users, 50K TPS
12 months: 5M users, 120K TPS
24 months: 15M users, 300K TPS

Contact: tech@exafrik.com
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExAfrik-Digital-Wallet-Technical-Specs.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/investor-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4">Technical Documentation</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Technical{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Specifications
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                ExAfrik Digital Wallet - Complete technical architecture
              </p>
            </div>
            <Button onClick={downloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Zap className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">10K TPS</h3>
                <p className="text-muted-foreground">Transaction Throughput</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">99.99%</h3>
                <p className="text-muted-foreground">Uptime SLA</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Cloud className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">100K+</h3>
                <p className="text-muted-foreground">Concurrent Users</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Architecture Pattern</h4>
                    <p className="text-sm text-muted-foreground">
                      Microservices-based, event-driven architecture with
                      horizontal auto-scaling and multi-region deployment for
                      high availability
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Scalability</h4>
                    <p className="text-sm text-muted-foreground">
                      Horizontal auto-scaling with load balancing, supporting
                      100,000+ concurrent users and 10,000 transactions per
                      second
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Frontend Technologies
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">
                          Web Application
                        </p>
                        <p className="text-xs text-muted-foreground">
                          React 18, TypeScript, Next.js 14, Tailwind CSS
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">
                          Mobile Application
                        </p>
                        <p className="text-xs text-muted-foreground">
                          React Native 0.73, Redux Toolkit, React Query
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Backend Technologies</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">
                          Microservices
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Node.js, Go, Python
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">API Gateway</p>
                        <p className="text-xs text-muted-foreground">
                          Kong, AWS API Gateway
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">
                          Message Queue
                        </p>
                        <p className="text-xs text-muted-foreground">
                          RabbitMQ, AWS SQS
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Database & Storage</h4>
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">Primary DB</p>
                        <p className="text-xs text-muted-foreground">
                          PostgreSQL 15
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">Cache</p>
                        <p className="text-xs text-muted-foreground">Redis 7</p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">Analytics</p>
                        <p className="text-xs text-muted-foreground">
                          ClickHouse
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <p className="font-medium text-sm mb-1">Search</p>
                        <p className="text-xs text-muted-foreground">
                          Elasticsearch 8
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Security Measures</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Authentication</p>
                          <p className="text-xs text-muted-foreground">
                            OAuth 2.0, JWT, Biometric (Face ID, Touch ID)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Encryption</p>
                          <p className="text-xs text-muted-foreground">
                            AES-256 (at rest), TLS 1.3 (in transit)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Fraud Detection</p>
                          <p className="text-xs text-muted-foreground">
                            ML-based anomaly detection, real-time monitoring
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">DDoS Protection</p>
                          <p className="text-xs text-muted-foreground">
                            Cloudflare, AWS Shield Advanced
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      Compliance Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50">
                        ✓ PCI DSS Level 1
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ ISO 27001:2013
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ SOC 2 Type II
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ GDPR Compliant
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ PSD2 Compliant
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ CBN Licensed
                      </Badge>
                      <Badge variant="outline" className="bg-green-50">
                        ✓ KYC/AML Compliant
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">
                      &lt; 200ms
                    </p>
                    <p className="text-sm text-muted-foreground">
                      API Response (p95)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">&lt; 3s</p>
                    <p className="text-sm text-muted-foreground">
                      Transaction Processing
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">10K</p>
                    <p className="text-sm text-muted-foreground">
                      TPS Throughput
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      &lt; 50ms
                    </p>
                    <p className="text-sm text-muted-foreground">
                      DB Query (p99)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">100K+</p>
                    <p className="text-sm text-muted-foreground">
                      Concurrent Users
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-600">99.99%</p>
                    <p className="text-sm text-muted-foreground">Uptime SLA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Scalability Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">Current Capacity</p>
                      <Badge>Now</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      500K users - 12K TPS - 5 regions
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">6-Month Target</p>
                      <Badge variant="outline">Q3 2024</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      2M users - 50K TPS - 8 regions
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">12-Month Target</p>
                      <Badge variant="outline">Q1 2025</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      5M users - 120K TPS - 12 regions
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">24-Month Target</p>
                      <Badge variant="outline">Q1 2026</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      15M users - 300K TPS - 20 regions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnicalSpecs;
