"use client";
import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  BarChart3,
  LayoutDashboard,
  ShieldCheck,
  Key,
  Lock,
  Activity,
  Server
} from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  service: string;
  status: "Active" | "Pending" | "Completed";
  value: string;
}

const DEFAULT_CLIENTS: Client[] = [
  { id: 1, name: "Apex Tech Labs", email: "contact@apex.com", service: "Next.js Web App", status: "Active", value: "$2,500" },
  { id: 2, name: "Nova AI Studio", email: "hello@nova.ai", service: "Groq AI Agent", status: "Completed", value: "$1,800" },
  { id: 3, name: "Global Logistics", email: "info@globallog.com", service: "Data Scraping Engine", status: "Pending", value: "$950" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "security">("overview");
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Full-Stack Web Dev");
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  // Load clients from LocalStorage on initial render
  useEffect(() => {
    const savedClients = localStorage.getItem("atifdev_agency_clients");
    if (savedClients) {
      try {
        setClients(JSON.parse(savedClients));
      } catch (err) {
        setClients(DEFAULT_CLIENTS);
      }
    } else {
      setClients(DEFAULT_CLIENTS);
    }
    setIsLoaded(true);
  }, []);

  // Save clients to LocalStorage whenever clients state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("atifdev_agency_clients", JSON.stringify(clients));
    }
  }, [clients, isLoaded]);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newClient: Client = {
      id: Date.now(),
      name,
      email,
      service,
      status: "Pending",
      value: value.startsWith("$") ? value : `$${value || "0"}`,
    };

    setClients([newClient, ...clients]);
    setName("");
    setEmail("");
    setValue("");
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080c14] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0f172a] border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-bold text-base tracking-wide">
              Atifdev <span className="text-cyan-400">HUB</span>
            </span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>

            <button
              onClick={() => setActiveTab("clients")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "clients"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4" /> Clients ({clients.length})
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "security"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Security
            </button>
          </nav>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-gray-400">
          <p className="font-semibold text-white">Agency Version</p>
          <p className="mt-1">v2.4 Pro Production Ready</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize">
              {activeTab === "overview" && "SaaS Revenue Overview"}
              {activeTab === "clients" && "Client Directory & Leads"}
              {activeTab === "security" && "Security & System Metrics"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Atifdev Solution Hub • Real-time persistent data management.
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
            LocalStorage Synced
          </span>
        </div>

        {/* --- TAB 1: OVERVIEW VIEW --- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs uppercase font-semibold">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">$5,250</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs uppercase font-semibold">Total Clients</span>
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">{clients.length}</p>
                <p className="text-xs text-gray-400">Persistent in LocalStorage</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs uppercase font-semibold">Delivery Rate</span>
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">99.2%</p>
                <p className="text-xs text-cyan-400">Automated SLAs active</p>
              </div>
            </div>

            {/* Quick Add & Overview Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={handleAddClient} className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" /> Add New Client
                </h2>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-[#080c14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@acme.com"
                    className="w-full bg-[#080c14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Full-Stack Web Dev">Full-Stack Web Dev</option>
                    <option value="Custom AI Agent">Custom AI Agent</option>
                    <option value="Data Scraping Engine">Data Scraping Engine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">Project Value ($)</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="1500"
                    className="w-full bg-[#080c14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  Add Client Record
                </button>
              </form>

              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">Client Summary</h2>
                  <button onClick={() => setActiveTab("clients")} className="text-xs text-cyan-400 hover:underline">
                    View All ({clients.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 text-gray-400 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-3">Client</th>
                        <th className="py-3 px-3">Service</th>
                        <th className="py-3 px-3">Value</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {clients.slice(0, 4).map((client) => (
                        <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-3">
                            <p className="font-bold text-white">{client.name}</p>
                            <p className="text-[10px] text-gray-400">{client.email}</p>
                          </td>
                          <td className="py-3 px-3 text-gray-300">{client.service}</td>
                          <td className="py-3 px-3 font-semibold text-cyan-400">{client.value}</td>
                          <td className="py-3 px-3 text-right">
                            <button onClick={() => handleDelete(client.id)} className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: CLIENTS VIEW --- */}
        {activeTab === "clients" && (
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-white">Full Client Management Database</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="bg-[#080c14] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-gray-400 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-3">Client Name</th>
                    <th className="py-3 px-3">Email Address</th>
                    <th className="py-3 px-3">Service Provided</th>
                    <th className="py-3 px-3">Project Value</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-bold text-white">{client.name}</td>
                      <td className="py-3 px-3 text-gray-400">{client.email}</td>
                      <td className="py-3 px-3 text-gray-300">{client.service}</td>
                      <td className="py-3 px-3 font-semibold text-cyan-400">{client.value}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button onClick={() => handleDelete(client.id)} className="p-1.5 text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: SECURITY VIEW --- */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">API Authentication & Keys</h3>
                  <p className="text-xs text-gray-400">Groq API & Database Access</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                All external API integrations (Groq LLaMA models and cloud database connections) are encrypted using environment-level variables (`.env.local`).
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <Lock className="w-4 h-4" /> TLS 1.3 Active • API Endpoint Protected
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">System Health & Storage</h3>
                  <p className="text-xs text-gray-400">Local Browser Storage Sync</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Client records are persisted in `localStorage`. Page reloads or browser restarts will retain your newly created client data automatically.
              </p>
              <div className="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                <Activity className="w-4 h-4" /> LocalStorage Active • 100% Client Data Retained
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}