import { Cpu, Terminal, GitBranch, Database, Shield, Radio, Palette, Briefcase, BrainCircuit, Wrench } from 'lucide-react';
import { playClickSound } from '../../utils';

const skillSlugMap: Record<string, string> = {
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "Go": "go",
  "PHP": "php",
  "Python": "python",
  "Rust": "rust",
  "C#": "csharp",
  "Java": "openjdk",
  "Solidity": "solidity",
  "C": "c",

  "React": "react",
  "Next.js": "nextdotjs",
  "React Native (Expo)": "expo",
  "Tailwind CSS": "tailwindcss",
  "Vue.js": "vuedotjs",
  "Angular": "angular",
  "Framer Motion": "framer",
  "Three.js": "threedotjs",
  "Svelte": "svelte",
  "HTML": "html5",
  "CSS": "css3",

  "Node.js": "nodedotjs",
  "Bun": "bun",
  "Laravel": "laravel",
  "Django": "django",
  "Spring Boot": "springboot",
  "Hono": "hono",
  "Express.js": "express",
  "FastAPI": "fastapi",
  "NestJS": "nestjs",
  ".NET": "dotnet",

  "PostgreSQL": "postgresql",
  "MongoDB": "mongodb",
  "Redis": "redis",
  "MySQL": "mysql",
  "SQLite": "sqlite",
  "Supabase": "supabase",
  "Firebase": "firebase",

  "Docker": "docker",
  "DigitalOcean": "digitalocean",
  "AWS": "amazonwebservices",
  "CI/CD Pipelines": "githubactions",
  "Linux": "linux",
  "Nginx": "nginx",

  "Solana": "solana",
  "Ethers.js": "ethereum",
  "ICP (Internet Computer)": "internetcomputer",
  "Foundry": "solidity",
  "Smart Contracts": "solidity",

  "AI Agent Systems": "openai",
  "LLM Integration": "googlegemini",
  "Workflow Automation": "n8n",
  "WhatsApp Automation (Baileys + Meta API)": "whatsapp",
  "Telegram Bots": "telegram",

  "LangChain": "langchain",
  "LangGraph": "langchain",
  "CrewAI": "crewai",
  "LlamaIndex": "llamaindex",
  "Semantic Kernel": "microsoft",
  "AutoGPT": "github",
  "Multi-Agent Orchestration": "huggingface",
  "Cursor AI": "codeclimate",
  "Windsurf IDE": "water",
  "GitHub Copilot": "githubcopilot",
  "Cline (Claude Dev)": "anthropic",
  "v0 (by Vercel)": "vercel",
  "Hugging Face": "huggingface",

  "Figma": "figma",
  "Adobe XD": "adobexd",
  "Adobe Photoshop": "adobephotoshop",
  "CorelDraw": "coreldraw",

  "Microsoft Office": "microsoftoffice",
  "Microsoft Word": "microsoftword",
  "Microsoft Excel": "microsoftexcel",
  "Microsoft PowerPoint": "microsoftpowerpoint",

  "Git": "git",
  "GitHub": "github",
  "Shopify Storefront API": "shopify",
  "Paystack": "paystack",
  "Google Maps API": "google",
  "Postman": "postman",
  "VS Code": "visualstudiocode"
};

const getSkillSlug = (skillName: string): string => {
  const normalized = skillName.trim();
  if (skillSlugMap[normalized]) {
    return skillSlugMap[normalized];
  }
  
  const lower = normalized.toLowerCase();
  if (lower.includes("typescript")) return "typescript";
  if (lower.includes("javascript")) return "javascript";
  if (lower.includes("go")) return "go";
  if (lower.includes("php")) return "php";
  if (lower.includes("vue")) return "vuedotjs";
  if (lower.includes("angular")) return "angular";
  if (lower.includes("laravel")) return "laravel";
  if (lower.includes("django")) return "django";
  if (lower.includes("spring boot") || lower.includes("springboot")) return "springboot";
  if (lower.includes("mysql")) return "mysql";
  if (lower.includes("firebase")) return "firebase";
  if (lower.includes("solana")) return "solana";
  if (lower.includes("microsoft office") || lower.includes("office")) return "microsoftoffice";
  if (lower.includes("word")) return "microsoftword";
  if (lower.includes("excel")) return "microsoftexcel";
  if (lower.includes("powerpoint")) return "microsoftpowerpoint";
  if (lower.includes("figma")) return "figma";
  if (lower.includes("xd")) return "adobexd";
  if (lower.includes("photoshop")) return "adobephotoshop";
  if (lower.includes("coreldraw") || lower.includes("corel")) return "coreldraw";
  if (lower.includes("react native")) return "expo";
  if (lower.includes("react")) return "react";
  if (lower.includes("next")) return "nextdotjs";
  if (lower.includes("node")) return "nodedotjs";
  if (lower.includes("tailwind")) return "tailwindcss";
  if (lower.includes("postgresql") || lower.includes("postgres")) return "postgresql";
  if (lower.includes("mongo")) return "mongodb";
  if (lower.includes("redis")) return "redis";
  if (lower.includes("docker")) return "docker";
  if (lower.includes("digitalocean") || lower.includes("digital ocean")) return "digitalocean";
  if (lower.includes("aws")) return "amazonwebservices";
  if (lower.includes("solidity")) return "solidity";
  if (lower.includes("ethereum") || lower.includes("ether")) return "ethereum";
  if (lower.includes("whatsapp")) return "whatsapp";
  if (lower.includes("telegram")) return "telegram";
  if (lower.includes("git")) return "git";
  if (lower.includes("shopify")) return "shopify";
  if (lower.includes("paystack")) return "paystack";
  if (lower.includes("google")) return "google";
  if (lower.includes("postman")) return "postman";
  if (lower.includes("vs code") || lower.includes("vscode")) return "visualstudiocode";
  if (lower.includes("openai") || lower.includes("ai agent")) return "openai";
  if (lower.includes("langchain")) return "langchain";
  if (lower.includes("langgraph")) return "langchain";
  if (lower.includes("crewai")) return "crewai";
  if (lower.includes("llamaindex")) return "llamaindex";
  if (lower.includes("semantic kernel")) return "microsoft";
  if (lower.includes("autogpt") || lower.includes("auto-gpt")) return "github";
  if (lower.includes("cursor")) return "codeclimate";
  if (lower.includes("windsurf")) return "water";
  if (lower.includes("copilot")) return "githubcopilot";
  if (lower.includes("cline")) return "anthropic";
  if (lower.includes("v0")) return "vercel";
  if (lower.includes("hugging face") || lower.includes("huggingface")) return "huggingface";
  
  return "";
};

const skillColorMap: Record<string, string> = {
  "typescript": "3178C6",
  "javascript": "F7DF1E",
  "go": "00ADD8",
  "php": "777BB4",
  "python": "3776AB",
  "rust": "E4371B", 
  "csharp": "0078D4", 
  "openjdk": "ED8B00", 
  "c": "00599C", 
  "solidity": "CCCCCC",

  "react": "61DAFB",
  "nextdotjs": "FFFFFF", 
  "expo": "FFFFFF",
  "tailwindcss": "06B6D4",
  "vuedotjs": "4FC08D",
  "angular": "DD0031",
  "framer": "FF00BF",
  "threedotjs": "FFFFFF",
  "svelte": "FF3E00",
  "html5": "E34F26",
  "css3": "1572B6", 

  "nodedotjs": "339933",
  "bun": "FFFFFF",
  "laravel": "FF2D20",
  "django": "44B78B",
  "springboot": "6DB33F",
  "hono": "E36002",
  "express": "FFFFFF",
  "fastapi": "009688",
  "nestjs": "E0234E",
  "dotnet": "512BD4",

  "postgresql": "4169E1",
  "mongodb": "47A248",
  "redis": "DC382D",
  "mysql": "4479A1",
  "sqlite": "0F80B6",
  "supabase": "3ECF8E",
  "firebase": "FFCA28",

  "docker": "2496ED",
  "digitalocean": "0080FF",
  "amazonwebservices": "FF9900",
  "githubactions": "2088FF",
  "linux": "FCC624",
  "nginx": "009639",

  "solana": "14F195", 
  "ethereum": "ECEFF1",
  "internetcomputer": "F15A24",

  "openai": "10A37F",
  "googlegemini": "8E75C2",
  "n8n": "FF6C37",
  "whatsapp": "25D366",
  "telegram": "26A5E4",

  "langchain": "FFFFFF",
  "crewai": "FF5722",
  "llamaindex": "FFFFFF",
  "microsoft": "0078D4",
  "github": "FFFFFF",
  "huggingface": "FFD21E",
  "codeclimate": "FFFFFF",
  "water": "00E5FF",
  "githubcopilot": "FFFFFF",
  "anthropic": "D97706",
  "vercel": "FFFFFF",

  "figma": "F24E1E",
  "adobexd": "FF61F6",
  "adobephotoshop": "31A8FF",
  "coreldraw": "009F4D",

  "microsoftoffice": "D83B01",
  "microsoftword": "2B579A",
  "microsoftexcel": "107C41",
  "microsoftpowerpoint": "C43E1C",

  "git": "F05032",
  "shopify": "7AB55C",
  "paystack": "09A5DB",
  "google": "4285F4",
  "postman": "FF6C37",
  "visualstudiocode": "007ACC"
};

const getBrandColorHex = (slug: string): string => {
  return skillColorMap[slug] || "FFFFFF";
};

interface SkillGroupCardProps {
  group: { category: string; skills: string[] };
  idx: number;
  accentColor: 'green' | 'cyan' | 'pink' | 'purple' | 'yellow';
  glowShadowClass: string;
  dotAccentClass: string;
  hoverBorderAccentClass: string;
  accentTextClass: string;
}

export default function SkillGroupCard({
  group,
  idx,
  accentColor,
  glowShadowClass,
  dotAccentClass,
  hoverBorderAccentClass,
  accentTextClass
}: SkillGroupCardProps) {
  
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toUpperCase()) {
      case 'LANGUAGES': return <Terminal className={`w-4 h-4 ${accentTextClass}`} />;
      case 'AGENTIC DEVELOPMENT': return <BrainCircuit className="w-4 h-4 text-[#BD00FF]" />;
      case 'AGENTIC CODING TOOLS': return <Wrench className="w-4 h-4 text-amber-300" />;
      case 'FRONTEND': return <Cpu className="w-4 h-4 text-[#00D4FF]" />;
      case 'BACKEND': return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case 'DATABASES': return <Database className="w-4 h-4 text-amber-400" />;
      case 'CLOUD & DEVOPS': return <Shield className={`w-4 h-4 ${accentTextClass}`} />;
      case 'CREATIVE & DESIGN': return <Palette className="w-4 h-4 text-[#FF007F]" />;
      case 'OFFICE & PRODUCTIVITY': return <Briefcase className="w-4 h-4 text-[#39FF14]" />;
      default: return <Radio className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div 
      onMouseEnter={() => playClickSound('hover')}
      className={`p-5 rounded-2xl bg-[#050816] border border-white/5 hover:border-white/10 transition-all duration-300 text-left flex flex-col justify-between ${glowShadowClass}`}
    >
      <div className="space-y-4">
        {/* Title Line */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            {getCategoryIcon(group.category)}
            <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
              {group.category}
            </span>
          </div>
          <span className="text-[7.5px] font-mono text-slate-500 uppercase">SYS_ACT_0{idx+1}</span>
        </div>

        {/* Flat bullet points list */}
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {group.skills.map((skill, skillIdx) => {
            const slug = getSkillSlug(skill);
            const brandColorHex = getBrandColorHex(slug);
            return (
              <span 
                key={skillIdx}
                onClick={() => playClickSound('click')}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  playClickSound('hover');
                }}
                className={`group inline-flex items-center text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded bg-[#0c1228]/80 border border-white/5 text-[#CAD5EE] hover:text-white hover:border-white/15 hover:bg-[#141b36] hover:shadow-[0_0_8px_rgba(255,255,255,0.08)] ${hoverBorderAccentClass} hover:scale-[1.04] transition-all cursor-pointer select-none`}
              >
                {slug ? (
                  <img 
                    src={`https://cdn.simpleicons.org/${slug}/${brandColorHex}`}
                    alt={`${skill} logo`}
                    className="w-3.5 h-3.5 mr-1.5 object-contain opacity-95 group-hover:opacity-100 group-hover:scale-110 brightness-110 transition-all duration-300 pointer-events-none"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className={`w-1 h-1 ${dotAccentClass} rounded-full mr-2 inline-block shrink-0`} />
                )}
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Technical Indicator */}
      <div className="pt-3.5 border-t border-white/5 mt-5 flex justify-between items-center text-[8px] font-mono text-slate-600 select-none">
        <span>MODULE: COMPONENT_FLOW</span>
        <span>STATUS: STABLE</span>
      </div>
    </div>
  );
}
