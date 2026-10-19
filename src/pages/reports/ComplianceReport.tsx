import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Shield,
  CheckCircle2,
  FileText,
  Lock,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceReport = () => {
  const downloadPDF = () => {
    const content = `
EXAFRIK DIGITAL WALLET - COMPLIANCE REPORT Q4 2023

Executive Summary:
ExAfrik Digital Wallet maintains full compliance with all applicable regulations including PCI DSS, GDPR, PSD2, and local financial regulations across all operating jurisdictions.

Regulatory Compliance Status:

✓ PCI DSS Level 1 Certification
- Status: Certified
- Last Audit: December 2023
- Next Audit: December 2024
- Auditor: Coalfire Systems Inc.
- Findings: 0 critical issues

✓ GDPR Compliance (EU)
- Status: Fully Compliant
- DPO: Jane Okonkwo, CIPP/E
- Last Review: November 2023
- Data Processing Agreements: 45 vendors
- Findings: 0 violations

✓ PSD2 Compliance (Europe)
- Status: Compliant
- Strong Customer Authentication: Implemented
- API Security: OAuth 2.0, TLS 1.3
- Transaction Monitoring: Real-time
- Findings: 0 non-conformities

✓ CBN License (Nigeria)
- Status: Active License #PSB2023-0158
- Issued: March 2023
- Valid Until: March 2028
- Capital Requirements: Met (NGN 2B)
- Last Inspection: October 2023
- Findings: 0 major issues

✓ KYC/AML Compliance
- Program: Risk-based approach
- Identity Verification: Electronic verification + document
- Transaction Monitoring: Real-time ML-based
- Suspicious Activity Reports: 23 filed (Q4 2023)
- Training: Quarterly for all staff
- Findings: 0 regulatory actions

Data Privacy & Protection:

User Data Collection:
- Minimal data collection principle
- Explicit user consent required
- Purpose limitation enforced
- Data retention: 7 years (regulatory requirement)
- Right to access: Automated user portal
- Right to erasure: 30-day fulfillment SLA

Data Security Measures:
✓ Encryption at rest (AES-256)
✓ Encryption in transit (TLS 1.3)
✓ Multi-factor authentication
✓ Biometric authentication
✓ Regular penetration testing
✓ Security awareness training
✓ Incident response plan
✓ Business continuity plan

Data Breach Response:
- Incident Response Team: 24/7 availability
- Detection Time: < 15 minutes (avg)
- Notification Timeline: Within 72 hours (GDPR)
- User Communication: Email, SMS, in-app
- Regulatory Reporting: As required
- Historical Breaches: 0 material breaches

Third-Party Risk Management:

Vendor Assessment:
- Total Vendors: 45
- Critical Vendors: 12
- Vendor Audits: Annual
- Security Questionnaires: Pre-onboarding
- Contracts: Include compliance clauses
- Insurance: $10M cyber liability coverage

Payment Partners:
✓ Stripe (PCI DSS Level 1)
✓ Paystack (PCI DSS Level 1)
✓ M-Pesa (Safaricom - Licensed)
✓ Airtel Money (Licensed)
✓ 25 Banking partners (all licensed)

Audit & Testing:

Internal Audits:
- Frequency: Quarterly
- Scope: All compliance domains
- Last Audit: December 2023
- Issues Found: 3 low-risk
- Remediation: 100% completed

External Audits:
- PCI DSS: Annual (Coalfire)
- SOC 2: Annual (Deloitte)
- Penetration Testing: Quarterly (NCC Group)
- ISO 27001: Annual (BSI)

Security Incidents (Q4 2023):

Total Incidents: 12
- High Severity: 0
- Medium Severity: 2 (resolved)
- Low Severity: 10 (resolved)
- Mean Time to Detection: 8 minutes
- Mean Time to Resolution: 2.5 hours
- Customer Impact: 0 incidents
- Data Breach: 0 incidents

Compliance Training:

Employee Training:
- Onboarding: Mandatory compliance training
- Annual Refresher: All staff
- Role-specific: Finance, engineering, support
- Completion Rate: 100%
- Assessment: Pass required (80% minimum)

Certifications:
- CIPP (Certified Information Privacy Professional): 5 staff
- CISM (Certified Information Security Manager): 3 staff
- CISSP: 2 staff
- CFE (Certified Fraud Examiner): 2 staff

Risk Assessment:

Key Risks Identified:
1. Cross-border regulatory changes (Medium)
2. Cyber threats and attacks (Medium)
3. Third-party vendor vulnerabilities (Low)
4. Staff turnover in compliance team (Low)

Mitigation Strategies:
- Dedicated regulatory affairs team
- 24/7 security operations center
- Vendor management program
- Competitive compensation and development

Compliance Roadmap 2024:

Q1 2024:
- Obtain ISO 27001 certification
- Expand to 3 new countries
- Implement enhanced transaction monitoring

Q2 2024:
- SOC 2 Type II audit
- GDPR internal audit
- Enhanced staff training program

Q3 2024:
- PCI DSS recertification
- Vendor security assessments
- Disaster recovery drill

Q4 2024:
- Annual compliance review
- Regulatory filings and renewals
- Risk assessment update

Regulatory Contacts:
- Central Bank of Nigeria: compliance-cbn@exafrik.com
- Data Protection Commission: dpo@exafrik.com
- Financial Crimes Unit: aml@exafrik.com

Contact: compliance@exafrik.com
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExAfrik-Compliance-Report-Q4-2023.pdf";
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
              <Badge className="mb-4">Regulatory</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Compliance{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Report
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Q4 2023 - Regulatory compliance and security overview
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
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">100%</h3>
                <p className="text-muted-foreground">Compliance Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">7</h3>
                <p className="text-muted-foreground">Active Certifications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Eye className="w-10 h-10 text-purple-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">0</h3>
                <p className="text-muted-foreground">Major Findings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Lock className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">0</h3>
                <p className="text-muted-foreground">Data Breaches</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Regulatory Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold">
                          PCI DSS Level 1 Certification
                        </h4>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        Certified
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">
                          Last Audit:
                        </span>
                        <span className="font-semibold ml-2">
                          December 2023
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Next Audit:
                        </span>
                        <span className="font-semibold ml-2">
                          December 2024
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Auditor:</span>
                        <span className="font-semibold ml-2">
                          Coalfire Systems
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Payment Card Industry Data Security Standard compliance
                      with 0 critical findings
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold">GDPR Compliance</h4>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        Compliant
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">DPO:</span>
                        <span className="font-semibold ml-2">
                          Jane Okonkwo, CIPP/E
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Last Review:
                        </span>
                        <span className="font-semibold ml-2">
                          November 2023
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vendors:</span>
                        <span className="font-semibold ml-2">
                          45 DPAs signed
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Full compliance with EU General Data Protection Regulation
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold">CBN License (Nigeria)</h4>
                      </div>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">License:</span>
                        <span className="font-semibold ml-2">
                          #PSB2023-0158
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Valid Until:
                        </span>
                        <span className="font-semibold ml-2">March 2028</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Capital:</span>
                        <span className="font-semibold ml-2">NGN 2B (Met)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Central Bank of Nigeria Payment Service Bank license in
                      good standing
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold">ISO 27001:2013</h4>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        Certified
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">
                          Certified:
                        </span>
                        <span className="font-semibold ml-2">June 2023</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Auditor:</span>
                        <span className="font-semibold ml-2">BSI Group</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Next Audit:
                        </span>
                        <span className="font-semibold ml-2">June 2024</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Information Security Management System certification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Data Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Data Protection Measures</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Encryption at Rest
                          </p>
                          <p className="text-xs text-muted-foreground">
                            AES-256 encryption for all stored data
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Encryption in Transit
                          </p>
                          <p className="text-xs text-muted-foreground">
                            TLS 1.3 for all data transmission
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Multi-Factor Authentication
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Required for all sensitive operations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Biometric Authentication
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Face ID, Touch ID, fingerprint
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Privacy Controls</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Data Minimization
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Only collect necessary information
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">User Consent</p>
                          <p className="text-xs text-muted-foreground">
                            Explicit consent for data processing
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Right to Access</p>
                          <p className="text-xs text-muted-foreground">
                            Automated user data portal
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">
                            Right to Erasure
                          </p>
                          <p className="text-xs text-muted-foreground">
                            30-day fulfillment SLA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Security Incidents Q4 2023
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-sm text-muted-foreground">
                      High Severity
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <p className="text-3xl font-bold text-yellow-600">2</p>
                    <p className="text-sm text-muted-foreground">
                      Medium Severity
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-600">10</p>
                    <p className="text-sm text-muted-foreground">
                      Low Severity
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Mean Time to Detection
                    </p>
                    <p className="text-xl font-bold">8 minutes</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Mean Time to Resolution
                    </p>
                    <p className="text-xl font-bold">2.5 hours</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Customer Impact
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      0 incidents
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Data Breaches
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      0 breaches
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Audit Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">PCI DSS Annual Audit</h4>
                      <Badge variant="outline">December 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conducted by Coalfire Systems Inc.
                    </p>
                    <div className="text-sm">
                      <strong>Findings:</strong> 0 critical, 0 high, 2 medium
                      (remediated)
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">SOC 2 Type II Audit</h4>
                      <Badge variant="outline">November 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conducted by Deloitte
                    </p>
                    <div className="text-sm">
                      <strong>Findings:</strong> Clean opinion with no
                      exceptions
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Penetration Testing</h4>
                      <Badge variant="outline">December 2023</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conducted by NCC Group
                    </p>
                    <div className="text-sm">
                      <strong>Findings:</strong> 3 low-risk vulnerabilities (all
                      patched)
                    </div>
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

export default ComplianceReport;
