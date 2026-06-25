export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  fullWriteup: string;
  mediumUrl?: string;
}

export interface Cert {
  id: string;
  name: string;
  image: string;
  category: string;
}

export interface CertGroup {
  id: string;
  groupName: string;
  groupImage: string;
  category: string;
  count: number;
  certs: Cert[];
}

export type CertItem = Cert | CertGroup;

export function isCertGroup(item: CertItem): item is CertGroup {
  return "certs" in item;
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
  medium?: string;
}

export const projects: Project[] = [
  {
    id: "aws-soar",
    title: "AWS CloudTrail Identity Threat Detection & SOAR Platform",
    shortDescription:
      "Open-source MVP: FastAPI microservices, PostgreSQL, Redis Streams, and n8n SOAR orchestration for detecting privilege escalation, impossible travel, and credential misuse via CloudTrail.",
    tags: ["AWS", "SOAR", "Threat Detection", "FastAPI", "Redis", "CloudTrail", "Python"],
    fullWriteup: `## Overview

Building an open-source threat detection and SOAR platform focused on **AWS identity-based attacks** using CloudTrail logs. The system detects malicious activity in real time and automatically generates containment plans and incident timelines.

## Architecture

\`\`\`
CloudTrail Logs
      ↓
FastAPI Microservices (ingestion + detection)
      ↓
Redis Streams (event pipeline)
      ↓
PostgreSQL (event storage + enrichment)
      ↓
n8n SOAR (automated response workflows)
      ↓
Incident Timeline Viewer (web UI)
\`\`\`

## Detection Logic

Event-driven detection rules implemented via Redis Streams-based alert enrichment:

### Privilege Escalation
Monitors for sequences where a low-privilege IAM identity attaches AdministratorAccess or creates new admin users within a time window.

### Impossible Travel
Cross-references source IPs from consecutive API calls against geolocation data — flags when a user authenticates from geographically impossible locations within minutes.

### Credential Misuse
Detects anomalous API call patterns: unusually high volume from a single identity, calls to sensitive APIs (sts:AssumeRole, iam:CreateUser) outside business hours, or calls from unfamiliar regions.

## SOAR Response Automation (n8n)

When a high-severity alert fires:
1. **Enrich** — query AbuseIPDB and GreyNoise for source IP reputation
2. **Contain** — auto-generate IAM policy to deny the suspect identity
3. **Notify** — post to Slack with incident summary and recommended actions
4. **Timeline** — build a chronological event view linked to the incident

## Current Status

Active development — MVP targeting detection coverage for the top 10 AWS identity attack patterns from the MITRE ATT&CK Cloud matrix.`,
  },
  {
    id: "soc-lab-gcp",
    title: "SOC Lab on Google Cloud Platform",
    shortDescription:
      "End-to-end SOC build: ELK Stack, Elastic Agent on Windows and Ubuntu, Mythic C2 kill chain simulation, custom detection rules, osTicket SOAR integration, and Elastic Defend EDR with automated host isolation.",
    tags: ["Blue Team", "ELK Stack", "SOC", "Detection Engineering", "GCP", "SOAR", "EDR"],
    fullWriteup: `## Overview

Built a full Security Operations Center lab on Google Cloud Platform — from infrastructure provisioning to active detection engineering and automated response. The lab simulates a realistic enterprise environment with both attacker and defender tooling deployed.

## Architecture

- **ELK Stack** (Elasticsearch, Logstash, Kibana) as the SIEM backbone
- **Elastic Agent** deployed on Windows Server and Ubuntu endpoints
- **Elastic Defend EDR** with policy-based automated host isolation
- **Mythic C2** framework for adversary simulation
- **osTicket** integrated as SOAR ticketing for alert-to-incident workflow

## Kill Chain Simulation

Used **Mythic C2** to simulate a full attack chain:
1. Initial access via phishing payload (Mythic Apollo agent)
2. Privilege escalation using token impersonation
3. Lateral movement via SMB
4. Credential dumping (simulated LSASS access)
5. Data staging and exfil attempt

## Detection Rules Built

| Rule | Trigger | Severity |
|------|---------|----------|
| SSH/RDP Brute-Force | >10 failed auths in 60s | High |
| LSASS Access | Process accessing lsass.exe | Critical |
| Mythic Beacon Callback | C2 outbound pattern | Critical |
| New Local Admin Created | net localgroup command | High |
| Large Outbound Transfer | >100MB to external IP | Medium |

## Threat Intelligence Enrichment

All flagged source IPs automatically enriched against:
- **AbuseIPDB** — abuse confidence score
- **GreyNoise** — noise vs. targeted classification

High-confidence malicious IPs trigger automated Elastic Defend host isolation.

## Results

Successfully detected all simulated attack techniques with zero false negatives. SSH/RDP brute-force rules include **geo-mapping** in Kibana for visual correlation.`,
    mediumUrl:
      "https://medium.com/@taletrove18/building-a-real-world-soc-lab-on-gcp-from-diagram-to-defense-b170ce2013dd",
  },
  {
    id: "iot-pentest-alexa",
    title: "IoT Security Assessment — Amazon Alexa Echo Show Gen 1",
    shortDescription:
      "SSL pinning bypass with Frida, hardcoded JWT extraction via MobSF, Dolphin Attack via ultrasonic commands, and a published malicious Alexa skill that triggered an Amazon account hold mid-assessment.",
    tags: ["IoT Security", "Pentesting", "Frida", "MobSF", "Hardware", "Alexa"],
    fullWriteup: `## Overview

Conducted a comprehensive security assessment of the **Amazon Alexa Echo Show Gen 1** covering mobile application, cloud API, hardware interfaces, and network traffic. Produced several notable findings — including one that triggered an active Amazon account hold during the assessment.

## Mobile Application Analysis (MobSF + Frida)

### SSL Pinning Bypass
The companion Alexa app implements certificate pinning. Bypassed using **Frida** with a custom script targeting the \`X509TrustManager\` implementation:

\`\`\`javascript
Java.perform(function() {
  var TrustManager = Java.use("com.amazon.alexa.ssl.AlexaTrustManager");
  TrustManager.checkServerTrusted.overload(
    "[Ljava.security.cert.X509Certificate;", "java.lang.String"
  ).implementation = function(chain, authType) {
    // bypassed
  };
});
\`\`\`

### Hardcoded JWT Extraction
After bypassing SSL pinning, intercepted API traffic revealed **hardcoded JWT tokens** in the application binary. Extracted using static analysis in **MobSF** — tokens were valid and linked to the test Amazon account.

## Dolphin Attack — Ultrasonic Command Injection

Executed a **Dolphin Attack** using a speaker driven above 20 kHz — Alexa responded to ultrasonic voice commands inaudible to humans in the room. Commands tested:
- \`"Alexa, open the door"\` (smart home simulation)
- \`"Alexa, call [number]"\`

## Published Malicious Alexa Skill

Developed and published a malicious Alexa skill to the official Alexa Skills store as a proof-of-concept. The skill used the **CanFulfillIntentRequest** interface to intercept intents beyond its declared scope.

> **Amazon's response:** The account used to publish the skill received an active hold mid-assessment. The skill was subsequently reviewed and removed.

## Network Traffic Analysis

Captured traffic with Wireshark on a mirrored port:
- **TLS 1.0/1.1 in use** — device exposed to BEAST, SWEET32, and LUCKY13 attacks
- MQTT traffic visible for smart home device coordination
- SSDP/UPnP broadcasting device identity on LAN

## Key Findings

| Finding | Severity |
|---------|----------|
| SSL pinning bypass | High |
| Hardcoded JWT in binary | Critical |
| TLS 1.0/1.1 enabled | High |
| Dolphin Attack susceptibility | High |
| Malicious skill publication | High |`,
    mediumUrl:
      "https://medium.com/@taletrove18/comprehensive-iot-penetration-testing-on-amazon-alexa-echo-show-gen-1-8d9331dcf8e8",
  },
  {
    id: "arm-emulation",
    title: "Raspberry Pi Pico Firmware Reverse Engineering",
    shortDescription:
      "Reversed ARM Cortex-M0+ firmware with Ghidra, emulated execution via Unicorn Engine to crack a 10,000-possibility PIN without hardware access, and recovered the hidden flag.",
    tags: ["Reverse Engineering", "ARM", "Ghidra", "Unicorn Engine", "Firmware", "Embedded Security"],
    fullWriteup: `## Overview

Reversed the firmware of a **Raspberry Pi Pico (RP2040)** using Ghidra for static disassembly and the **Unicorn Engine** for dynamic emulation. The objective was to recover a hidden flag protected by a PIN verification routine — without access to the physical device.

## Static Analysis with Ghidra

Loaded the raw ARM Cortex-M0+ binary into Ghidra after configuring the RP2040 memory map (flash at \`0x10000000\`, SRAM at \`0x20000000\`):

\`\`\`
Flash: 0x10000000 – 0x10200000 (2MB)
SRAM:  0x20000000 – 0x20042000 (264KB)
\`\`\`

Identified a PIN verification function at \`0x10001A4C\` — takes a 4-digit input, compares against a stored hash, and jumps to a flag-decryption routine on success.

The PIN space was **10,000 possibilities** (0000–9999) — feasible to brute-force via emulation.

## Emulation with Unicorn Engine

Set up emulation targeting only the PIN verification function:

\`\`\`python
import unicorn
from unicorn.arm_const import *

mu = unicorn.Uc(unicorn.UC_ARCH_ARM, unicorn.UC_MODE_THUMB)

FLASH_BASE = 0x10000000
SRAM_BASE  = 0x20000000

mu.mem_map(FLASH_BASE, 2 * 1024 * 1024)
mu.mem_map(SRAM_BASE,  264 * 1024)

with open("firmware.bin", "rb") as f:
    mu.mem_write(FLASH_BASE, f.read())

VERIFY_FUNC = 0x10001A4D  # +1 for THUMB mode
VERIFY_END  = 0x10001A80

for pin in range(10000):
    pin_str = f"{pin:04d}".encode()

    # Write PIN candidate to SRAM input buffer
    mu.mem_write(SRAM_BASE + 0x100, pin_str)
    mu.reg_write(UC_ARM_REG_R0, SRAM_BASE + 0x100)

    try:
        mu.emu_start(VERIFY_FUNC, VERIFY_END, timeout=1000)
        result = mu.reg_read(UC_ARM_REG_R0)
        if result == 1:
            print(f"PIN found: {pin:04d}")
            break
    except:
        pass
\`\`\`

## Result

PIN cracked in **< 30 seconds** of emulated execution. After inputting the correct PIN in Ghidra's emulator, the flag-decryption routine executed and the flag was recovered.

## Key Takeaway

Unicorn Engine enables full coverage brute-force of embedded PIN routines without needing the physical device — a technique directly applicable to real-world IoT firmware analysis.`,
  },
  {
    id: "malware-analysis",
    title: "Malware Analysis: Static & Dynamic Labs",
    shortDescription:
      "Static and dynamic analysis of real malware samples — unpacking, disassembly, sandbox detonation, and YARA rule authoring.",
    tags: ["Malware Analysis", "Reverse Engineering", "IDA Pro", "YARA", "FlareVM"],
    fullWriteup: `## Overview

Analysed multiple malware samples as part of University of Birmingham coursework — covering a dropper, a RAT, and a ransomware variant using both static and dynamic techniques.

## Static Analysis

### Tools
- **PEStudio** — PE header inspection, imports, strings
- **IDA Pro (Free)** — disassembly and control flow graphs
- **CyberChef** — decoding obfuscated strings
- **YARA** — detection rule writing

### Key Findings (Sample 1 — Dropper)
- Packed with **UPX** — unpacked with \`upx -d\`
- Imports: \`CreateRemoteThread\`, \`VirtualAllocEx\`, \`WriteProcessMemory\` → classic process injection
- Hardcoded C2: \`185.220.101.x\` (Tor exit node range)
- Mutex created: \`Global\\{GUID}\` for single-instance enforcement

\`\`\`
Strings of interest:
cmd.exe /c net user administrator [REDACTED] /add
cmd.exe /c net localgroup administrators [REDACTED] /add
\`\`\`

## Dynamic Analysis

### Environment
- **FlareVM** (isolated, no internet)
- **Procmon + Procexp** for process and file monitoring
- **Wireshark** for network activity
- **Regshot** for registry diff

### Behaviour Observed
1. Dropped payload to \`%APPDATA%\\svchost32.exe\`
2. Created persistence run key:
   \`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`
3. Outbound connection on port **4444** (blocked by isolation)
4. Spawned \`cmd.exe\` via \`CreateProcess\` with SYSTEM token

## YARA Rule

\`\`\`yara
rule Dropper_Generic {
  meta:
    description = "Detects dropper with process injection indicators"
  strings:
    $s1 = "CreateRemoteThread" ascii
    $s2 = "VirtualAllocEx" ascii
    $s3 = "svchost32.exe" ascii
  condition:
    2 of them
}
\`\`\`

Full lab write-up with all samples and IOCs on Medium.`,
    mediumUrl:
      "https://medium.com/@taletrove18/malware-analysis-static-dynamic-analysis-labs-coursework-859861a7c06",
  },
  {
    id: "university-network",
    title: "Large-Scale University Network Design",
    shortDescription:
      "Architected and configured a dual-campus university network with departmental segmentation, student labs, VLANs, and cloud email integration using Cisco Packet Tracer.",
    tags: ["Networking", "Cisco", "VLANs", "OSPF", "Packet Tracer"],
    fullWriteup: `## Overview

Designed and fully configured a large-scale network for a university spanning **two campuses** in Cisco Packet Tracer, supporting departmental segmentation, student lab isolation, inter-campus connectivity, and cloud email integration.

## Network Design

### Campus A (Main)
| VLAN | Department | Subnet |
|------|-----------|--------|
| 10 | Admin | 192.168.10.0/24 |
| 20 | Faculty | 192.168.20.0/24 |
| 30 | Student Labs | 192.168.30.0/24 |
| 40 | Server Farm | 192.168.40.0/24 |

Campus B mirrors the VLAN structure on different subnets, connected via a WAN serial link.

## Inter-VLAN Routing

Used a **Layer 3 switch** (Cisco 3560) as the distribution layer:

\`\`\`cisco
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
 no shutdown
ip routing
\`\`\`

## OSPF Between Campuses

\`\`\`cisco
router ospf 1
 network 192.168.0.0 0.0.255.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
\`\`\`

## Security Policies
- Port security on student lab ports (max 1 MAC)
- ACLs blocking student VLAN from server farm
- SSH-only management (Telnet disabled)
- BPDU Guard on all access ports

Full write-up with topology diagrams on Medium.`,
    mediumUrl:
      "https://medium.com/@taletrove18/designing-and-configuring-a-large-university-network-64ef908fa3d9",
  },
  {
    id: "soho-network",
    title: "Secure SOHO Network with VLANs",
    shortDescription:
      "Designed and configured a secure SOHO network with VLAN segmentation, wireless access, DHCP, and inter-VLAN routing using Cisco Packet Tracer.",
    tags: ["Networking", "SOHO", "VLANs", "Cisco", "Wireless"],
    fullWriteup: `## Overview

Built a complete SOHO network from scratch in Cisco Packet Tracer — VLANs for department separation, a wireless AP for guest access, DHCP for automatic assignment, and Router-on-a-Stick inter-VLAN routing.

## VLAN Design

| VLAN | Name | Subnet |
|------|------|--------|
| 10 | Management | 192.168.10.0/24 |
| 20 | Sales | 192.168.20.0/24 |
| 30 | Engineering | 192.168.30.0/24 |
| 40 | Guest WiFi | 192.168.40.0/24 |

## Inter-VLAN Routing (Router-on-a-Stick)

\`\`\`cisco
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
\`\`\`

## Security Policies
- Guest VLAN isolated from internal VLANs via ACL
- Management VLAN restricted to admin workstations
- Port security on all wired access ports
- Default VLAN 1 unused

Full configuration on Medium.`,
    mediumUrl:
      "https://medium.com/@taletrove18/building-and-configuring-a-soho-network-with-vlans-a7fe1c02e609",
  },
];

export const certifications: CertItem[] = [
  {
    id: "ceh",
    name: "Certified Ethical Hacker (CEH v11)",
    image: "/assets/certificates/ceh.svg",
    category: "Ethical Hacking",
  },
  {
    id: "isc2-cc",
    name: "Certified in Cybersecurity (CC) — ISC2",
    image: "/assets/certificates/isc2.svg",
    category: "Cybersecurity",
  },
  {
    id: "fortinet",
    name: "Fortinet Certified Associate — NSE",
    image: "/assets/certificates/fortinet.svg",
    category: "Network Security",
  },
  {
    id: "intel",
    name: "Intel — AI & High Performance Computing",
    image: "/assets/certificates/intel.svg",
    category: "AI / HPC",
  },
  {
    id: "ics-group",
    groupName: "ICS / SCADA Cybersecurity Training",
    groupImage: "/assets/certificates/ics-group.svg",
    category: "ICS / SCADA",
    count: 8,
    certs: [
      {
        id: "ics-100w",
        name: "100W — Cybersecurity Practices for Industrial Control Systems",
        image: "/assets/certificates/ICS/100W Cybersecurity Practices for Industrial Control Systems-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-210w",
        name: "210W-01 — Differences in Deployments of Industrial Control Systems",
        image: "/assets/certificates/ICS/210W-01 Differences in Deployments of Industrial Control Systems-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-1",
        name: "ICS Cybersecurity — Session 1",
        image: "/assets/certificates/ICS/ICS Session 1-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-2",
        name: "ICS Cybersecurity — Session 2",
        image: "/assets/certificates/ICS/ICS Session 2-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-4",
        name: "ICS Cybersecurity — Session 4",
        image: "/assets/certificates/ICS/ICS Session 4-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-5",
        name: "ICS Cybersecurity — Session 5",
        image: "/assets/certificates/ICS/ICS Session 5_-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-6",
        name: "ICS Cybersecurity — Session 6",
        image: "/assets/certificates/ICS/ICS Session 6-1.png",
        category: "ICS / SCADA",
      },
      {
        id: "ics-session-7",
        name: "ICS Cybersecurity — Session 7",
        image: "/assets/certificates/ICS/ICS Session 7-1.png",
        category: "ICS / SCADA",
      },
    ],
  } as CertGroup,
];

export const socialLinks: SocialLinks = {
  email: "moulikesavan07@gmail.com",
  linkedin: "https://www.linkedin.com/in/mouli-kesavan",
  github: "https://github.com/moulimk",
  medium: "https://medium.com/@taletrove18",
};
