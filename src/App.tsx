/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, RefreshCcw, Moon, Sun, Filter, ChevronDown, Clock, Upload, CreditCard, Building, User, ShieldAlert } from 'lucide-react';

// --- Types & Mock Data --- //

type Status = 'Pendente' | 'Processing' | 'Aprovado' | 'Rejeitado';
type Channel = 'PIX' | 'Bank Transfer' | 'BEP20 Wallet';
type RequestType = 'Depósito' | 'Saque';

interface RequestModel {
  id: string;
  clientName: string;
  type: RequestType;
  channel: Channel;
  value: string;
  status: Status;
  createdAt: string;
  team: string;
  email: string;
  pixOrWallet: string;
  bankName?: string;
  bankAgency?: string;
  bankAccount?: string;
}

const mockRequests: RequestModel[] = [
  { id: 'REQ-1092', clientName: 'Roberto Almeida', type: 'Depósito', channel: 'PIX', value: 'R$ 15.000,00', status: 'Pendente', createdAt: 'Hoje, 10:45', team: 'Corporate Alpha', email: 'roberto.almeida@corp.com', pixOrWallet: '089.123.456-78' },
  { id: 'REQ-1091', clientName: 'Sarah Jenkins', type: 'Depósito', channel: 'BEP20 Wallet', value: 'USDT 50,000.00', status: 'Processing', createdAt: 'Hoje, 09:30', team: 'Crypto Desk', email: 's.jenkins@trading.co', pixOrWallet: '0x1A2b3c4d5E6F7890' },
  { id: 'REQ-1090', clientName: 'Carlos Mota', type: 'Saque', channel: 'Bank Transfer', value: 'R$ 8.500,00', status: 'Aprovado', createdAt: 'Ontem, 16:20', team: 'Retail BR', email: 'cmota1988@gmail.com', pixOrWallet: '-', bankName: 'Itaú Unibanco', bankAgency: '0451', bankAccount: '12345-6' },
  { id: 'REQ-1089', clientName: 'Julia Nunes', type: 'Depósito', channel: 'PIX', value: 'R$ 2.000,00', status: 'Rejeitado', createdAt: 'Ontem, 14:10', team: 'Retail BR', email: 'julianunes@mail.com', pixOrWallet: 'julia.nunes@pix.com.br' },
  { id: 'REQ-1088', clientName: 'Marcus V.', type: 'Saque', channel: 'BEP20 Wallet', value: 'USDT 12,000.00', status: 'Pendente', createdAt: 'Ontem, 11:05', team: 'Crypto Desk', email: 'marcus.v@crypto.net', pixOrWallet: '0xF9e8D7c6B5A43210' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'solicitacoes' | 'dados'>('solicitacoes');
  const [isDark, setIsDark] = useState(false);
  const [selectedReq, setSelectedReq] = useState<RequestModel>(mockRequests[0]);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans antialiased text-sm">
      {/* HEADER EXECUTIVE LAYER */}
      <header className="sticky top-0 z-10 bg-[var(--bg-card)] border-b border-[var(--border-main)] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">Gestão de Carteira</h1>
          <p className="text-xs text-[var(--text-sec)]">Módulo Operacional-Financeiro</p>
        </div>
        <div className="flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-disc)]" />
            <input 
              type="text" 
              placeholder="Buscar cliente, ID ou PIX/Wallet..." 
              className="w-full bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[var(--blue-accent)] transition-colors text-[var(--text-main)]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-[var(--text-sec)] hover:bg-[var(--bg-panel)] rounded-md transition-colors cursor-pointer" title="Atualizar dados">
            <RefreshCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-[var(--text-sec)] hover:bg-[var(--bg-panel)] rounded-md transition-colors cursor-pointer" title="Alternar tema"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-blue-soft)] border border-[var(--border-blue-soft)] border-dashed flex items-center justify-center text-[var(--blue-accent)] font-medium text-xs">
            AD
          </div>
        </div>
      </header>

      {/* KPI CARDS */}
      <div className="px-6 py-4 grid grid-cols-4 gap-4">
        {[
          { title: 'Solicitações Pendentes', value: '24', sub: '+5 hoje', icon: Clock },
          { title: 'Depósitos (24h)', value: 'R$ 142K', sub: '32 aprovados', icon: Upload },
          { title: 'Saques (24h)', value: 'R$ 89K', sub: '12 aprovados', icon: CreditCard },
          { title: 'Canais Ativos', value: '3', sub: 'PIX, TED, BEP20', icon: Building },
        ].map((kpi, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[11px] font-medium text-[var(--text-disc)] uppercase tracking-wider mb-1">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold leading-none">{kpi.value}</span>
                <span className="text-[11px] text-[var(--text-sec)]">{kpi.sub}</span>
              </div>
            </div>
            <div className="p-2 bg-[var(--bg-panel)] rounded-lg">
              <kpi.icon className="w-4 h-4 text-[var(--text-sec)]" />
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="px-6 border-b border-[var(--border-main)]">
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('solicitacoes')}
            className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'solicitacoes' ? 'border-[var(--blue-accent)] text-[var(--blue-accent)]' : 'border-transparent text-[var(--text-sec)] hover:text-[var(--text-main)]'}`}
          >
            Solicitações
          </button>
          <button 
            onClick={() => setActiveTab('dados')}
            className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'dados' ? 'border-[var(--blue-accent)] text-[var(--blue-accent)]' : 'border-transparent text-[var(--text-sec)] hover:text-[var(--text-main)]'}`}
          >
            Dados de Depósito
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <main className="p-6">
        {activeTab === 'solicitacoes' ? <SolicitacoesTab reqs={mockRequests} selected={selectedReq} onSelect={setSelectedReq} /> : <DadosDepositoTab />}
      </main>
    </div>
  );
}

// ------ HELPER COMPONENTS ------ //

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    'Pendente': 'bg-[var(--status-pending-bg)] text-[var(--status-pending-text)] border-[var(--status-pending-text)]/30',
    'Processing': 'bg-[var(--status-process-bg)] text-[var(--status-process-text)] border-[var(--status-process-text)]/30',
    'Aprovado': 'bg-[var(--status-approved-bg)] text-[var(--status-approved-text)] border-[var(--status-approved-text)]/30',
    'Rejeitado': 'bg-[var(--status-rejected-bg)] text-[var(--status-rejected-text)] border-[var(--status-rejected-text)]/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}

// ------ SOLICITAÇÕES TAB ------ //

function SolicitacoesTab({ reqs, selected, onSelect }: { reqs: RequestModel[], selected: RequestModel, onSelect: (r: RequestModel) => void }) {
  return (
    <div className="flex flex-col gap-6">
      {/* SPLIT LAYOUT */}
      <div className="flex gap-6 items-start">
        
        {/* LEFT: INBOX */}
        <div className="w-[45%] flex-shrink-0 flex flex-col gap-3 min-w-[380px]">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              Caixa de Entrada <span className="bg-[var(--border-main)] text-[var(--text-main)] px-2 py-0.5 ml-1 rounded-full text-xs">24</span>
            </h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-panel)] border border-[var(--border-main)] text-[11px] font-medium text-[var(--text-sec)] hover:bg-[var(--border-main)] transition-colors cursor-pointer">
                <Filter className="w-3 h-3" /> Tipo <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-panel)] border border-[var(--border-main)] text-[11px] font-medium text-[var(--text-sec)] hover:bg-[var(--border-main)] transition-colors cursor-pointer">
                <Clock className="w-3 h-3" /> Status <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {reqs.map((req) => (
              <div 
                key={req.id} 
                onClick={() => onSelect(req)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${selected.id === req.id ? 'bg-[var(--bg-blue-soft)] border-[var(--border-blue-soft)] shadow-sm' : 'bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--text-disc)] hover:shadow-sm'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[var(--text-disc)]">{req.id}</span>
                  <StatusBadge status={req.status} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-[var(--text-main)] text-sm">{req.clientName}</h3>
                </div>
                <div className="flex items-center justify-between text-xs mt-3">
                  <div className="flex items-center gap-2 text-[var(--text-sec)]">
                    <span className="font-semibold">{req.type}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-disc)]"></span>
                    <span>{req.channel}</span>
                  </div>
                  <span className="font-semibold tracking-tight text-[var(--text-main)]">{req.value}</span>
                </div>
                <div className="text-[11px] text-[var(--text-disc)] mt-2 text-right border-t border-[var(--border-soft)] pt-2">{req.createdAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: DETAIL PANEL */}
        <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl shadow-sm flex flex-col pt-1">
          {/* HEADER */}
          <div className="p-5 border-b border-[var(--border-main)] bg-[var(--bg-card)] rounded-t-xl pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold mb-1.5">{selected.clientName}</h2>
                <div className="flex items-center gap-3 text-sm text-[var(--text-sec)]">
                  <span className="font-mono text-xs text-[var(--text-disc)]">{selected.id}</span>
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-1.5">Valor da Operação</p>
                <p className="text-2xl font-bold tracking-tight text-[var(--text-main)]">{selected.value}</p>
                <p className="text-xs font-semibold text-[var(--blue-accent)] mt-1.5 flex items-center justify-end gap-1.5"><ArrowRightIcon /> {selected.type} via {selected.channel}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid gap-6 bg-[var(--bg-panel)] rounded-b-xl border-t border-transparent">
            <div className="grid grid-cols-2 gap-6">
              {/* OPERATIONAL BLOCK */}
              <div className="bg-[var(--bg-card)] rounded-lg p-5 border border-[var(--border-main)] shadow-sm">
                <h4 className="text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-4">Identificação Operacional</h4>
                <div className="grid gap-3 text-xs">
                  <div className="flex justify-between border-b border-[var(--border-soft)] pb-1.5"><span className="text-[var(--text-sec)]">Equipe</span> <span className="font-medium text-[var(--text-main)]">{selected.team}</span></div>
                  <div className="flex justify-between border-b border-[var(--border-soft)] pb-1.5"><span className="text-[var(--text-sec)]">E-mail</span> <span className="font-medium text-[var(--text-main)]">{selected.email}</span></div>
                  <div className="flex justify-between pb-1.5"><span className="text-[var(--text-sec)]">{selected.channel === 'BEP20 Wallet' ? 'Client Wallet' : 'Client PIX/Doc'}</span> <span className="font-mono text-[var(--text-main)]">{selected.pixOrWallet}</span></div>
                </div>
              </div>

              {/* FINANCIAL BLOCK */}
              <div className="bg-[var(--bg-card)] rounded-lg p-5 border border-[var(--border-main)] shadow-sm">
                <h4 className="text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-4">Cadastro Financeiro</h4>
                {selected.bankName ? (
                  <div className="grid gap-3 text-xs">
                    <div className="flex justify-between border-b border-[var(--border-soft)] pb-1.5"><span className="text-[var(--text-sec)]">Banco</span> <span className="font-medium text-[var(--text-main)]">{selected.bankName}</span></div>
                    <div className="flex justify-between border-b border-[var(--border-soft)] pb-1.5"><span className="text-[var(--text-sec)]">Agência</span> <span className="font-medium text-[var(--text-main)]">{selected.bankAgency}</span></div>
                    <div className="flex justify-between pb-1.5"><span className="text-[var(--text-sec)]">Conta Corrente</span> <span className="font-medium text-[var(--text-main)]">{selected.bankAccount}</span></div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-[var(--text-disc)] text-xs italic tracking-wide">
                    {selected.type === 'Saque' ? 'Sem dados de banco' : 'Referência cripto (sem banco)'}
                  </div>
                )}
              </div>
            </div>

            {/* PRESENTED TO CLIENT BLOCK */}
            <div className="border border-[var(--border-blue-soft)] bg-[var(--bg-blue-soft)] rounded-lg p-5 shadow-sm">
               <h4 className="flex items-center gap-2 text-[10px] font-bold text-[var(--blue-accent)] uppercase tracking-widest mb-3">
                 <ShieldAlert className="w-4 h-4" /> 
                 Canal Exibido no Portal
               </h4>
               <p className="text-xs text-[var(--text-main)] font-medium max-w-3xl leading-relaxed">
                 O cliente visualizou os dados referentes a configuração global de <strong>{selected.channel}</strong> em <strong>{selected.createdAt}</strong>.
                 A conferência da transação depende da liquidação final no provedor.
               </p>
            </div>

            {/* OBS & NOTES */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-3">Obs do Cliente / Ref Externa</h4>
                <div className="bg-[var(--bg-card)] text-[var(--text-sec)] p-4 rounded-lg text-xs font-medium min-h-[90px] border border-[var(--border-main)] shadow-inner">
                  "Urgente, para cobrir margem da conta 82910."
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-3 flex items-center justify-between">
                  Nota Administrativa
                  <span className="text-[10px] font-normal lowercase tracking-normal bg-[var(--bg-card)] px-2 border border-[var(--border-main)] rounded">Oculto ao cliente</span>
                </h4>
                <textarea 
                  className="flex-1 w-full bg-[var(--bg-card)] text-[var(--text-main)] p-4 rounded-lg text-xs border border-[var(--border-main)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-accent)] focus:border-[var(--blue-accent)] resize-none shadow-sm transition-shadow"
                  placeholder="Adicione uma nota interna para a equipe..."
                ></textarea>
              </div>
            </div>

            {/* ACTIONS BLOCK */}
            <div className="pt-6 mt-2 border-t border-[var(--border-main)] flex items-center justify-between">
               <div className="flex items-center gap-6 text-xs text-[var(--text-sec)]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest">Saldo Aprovado</span>
                    <span className="font-bold text-sm text-[var(--text-main)]">R$ 45.300,00</span>
                  </div>
                  <div className="w-px h-8 bg-[var(--border-main)]"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--status-pending-text)]">Pendências Atuais</span>
                    <span className="font-bold text-sm text-[var(--text-main)]">R$ 15.000,00</span>
                  </div>
               </div>
               
               <div className="flex gap-3">
                  <button className="px-5 py-2.5 rounded-md text-[12px] font-semibold bg-[var(--bg-panel)] border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--border-main)] transition-colors cursor-pointer">
                    Em Análise
                  </button>
                  <button className="px-5 py-2.5 rounded-md text-[12px] font-semibold bg-[#ef4444] text-white hover:bg-red-600 border-none transition-colors cursor-pointer">
                    Rejeitar
                  </button>
                  <button className="px-7 py-2.5 rounded-md text-[12px] font-semibold bg-[#10b981] text-white hover:bg-emerald-600 border-none transition-colors cursor-pointer">
                    Aprovar Solicitação
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SECONDARY TABLES LAYER */}
      <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-[var(--border-main)]">
        <div>
           <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Clientes com cadastro financeiro</h3>
           <p className="text-[11px] text-[var(--text-sec)] mb-4">Base com métodos verificados e prontos para saque.</p>
           <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-2 max-h-[200px] overflow-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--bg-panel)] text-[var(--text-sec)] uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-2 border-b border-[var(--border-main)]">Cliente</th>
                    <th className="p-2 border-b border-[var(--border-main)]">Método Válido</th>
                    <th className="p-2 border-b border-[var(--border-main)]">Últ. Atualização</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-main)] font-medium">
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Roberto Almeida</td><td className="p-2 border-b border-[var(--border-soft)]">PIX</td><td className="p-2 border-b border-[var(--border-soft)] text-[var(--text-sec)]">Hoje</td></tr>
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Carlos Mota</td><td className="p-2 border-b border-[var(--border-soft)]">Itaú (0451)</td><td className="p-2 border-b border-[var(--border-soft)] text-[var(--text-sec)]">12/04</td></tr>
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Sarah Jenkins</td><td className="p-2 border-b border-[var(--border-soft)]">BEP20 Wallet</td><td className="p-2 border-b border-[var(--border-soft)] text-[var(--text-sec)]">01/04</td></tr>
                </tbody>
              </table>
           </div>
        </div>
        <div>
           <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Exposição consolidada por equipe</h3>
           <p className="text-[11px] text-[var(--text-sec)] mb-4">Volume financeiro transeunte nas últimas 24 horas.</p>
           <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-2 max-h-[200px] overflow-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--bg-panel)] text-[var(--text-sec)] uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-2 border-b border-[var(--border-main)]">Equipe</th>
                    <th className="p-2 border-b border-[var(--border-main)]">Depósitos</th>
                    <th className="p-2 border-b border-[var(--border-main)]">Saques</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-main)] font-medium">
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Corporate Alpha</td><td className="p-2 border-b border-[var(--border-soft)] text-emerald-600 dark:text-emerald-400">R$ 1.2M</td><td className="p-2 border-b border-[var(--border-soft)] text-rose-600 dark:text-rose-400">R$ 450K</td></tr>
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Retail BR</td><td className="p-2 border-b border-[var(--border-soft)] text-emerald-600 dark:text-emerald-400">R$ 380K</td><td className="p-2 border-b border-[var(--border-soft)] text-rose-600 dark:text-rose-400">R$ 512K</td></tr>
                  <tr><td className="p-2 border-b border-[var(--border-soft)]">Crypto Desk</td><td className="p-2 border-b border-[var(--border-soft)] text-emerald-600 dark:text-emerald-400">USDT 89K</td><td className="p-2 border-b border-[var(--border-soft)] text-rose-600 dark:text-rose-400">USDT 40K</td></tr>
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}

// ------ DADOS DE DEPÓSITO TAB ------ //

function DadosDepositoTab() {
  return (
    <div className="flex gap-8 max-w-7xl mx-auto items-start">
      {/* Configuration Forms */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border-main)] bg-[var(--bg-panel)]">
            <h3 className="font-bold text-sm tracking-tight text-[var(--text-main)] mb-1">Recebimento Bancário e PIX</h3>
            <p className="text-xs text-[var(--text-sec)]">Configuração institucional da conta principal para depósito fiduciário.</p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-5 bg-[var(--bg-card)]">
             <div className="col-span-2"><Label>Empresa PSP / Titular</Label><Input val="OpenFx Payments Ltda" /></div>
             <div><Label>Banco</Label><Input val="Banco BTG Pactual S.A. (208)" /></div>
             <div><Label>Chave PIX (CNPJ/E-mail)</Label><Input val="pagamentos@openfx.com" /></div>
             <div><Label>Agência</Label><Input val="0001" /></div>
             <div><Label>Conta Corrente</Label><Input val="765432-1" /></div>
             <div className="col-span-2 pt-3 border-t border-[var(--border-soft)] mt-2">
               <Label>QR Code PIX (Upload Manual)</Label>
               <div className="mt-3 border-2 border-dashed border-[var(--border-main)] rounded-xl p-8 flex flex-col items-center justify-center bg-[var(--bg-panel)] text-[var(--text-sec)] cursor-pointer hover:border-[var(--blue-accent)] hover:bg-[var(--bg-blue-soft)] transition-colors">
                  <div className="w-16 h-16 bg-white p-1 rounded shadow-sm border border-gray-200 mb-3">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=openfxpix" alt="QR" className="w-full h-full object-contain mix-blend-multiply opacity-50" />
                  </div>
                  <p className="text-xs font-bold text-[var(--text-main)] mb-1">qrcode_pix_agosto.png</p>
                  <p className="text-[11px] font-medium">Clique para substituir ou arraste a nova imagem</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="p-5 border-b border-[var(--border-main)] bg-[var(--bg-panel)] flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm tracking-tight text-[var(--text-main)] mb-1">Wallet Cripto (BEP20 / ERC20)</h3>
              <p className="text-xs text-[var(--text-sec)]">Recebimento de stablecoins. Precisão técnica exigida.</p>
            </div>
            <span className="px-2 py-1 bg-[var(--bg-blue-soft)] border border-[var(--border-blue-soft)] text-[var(--blue-accent)] text-[10px] font-bold tracking-widest uppercase rounded">Escopo Global</span>
          </div>
          <div className="p-6 grid grid-cols-1 gap-5 bg-[var(--bg-card)]">
             <div><Label>Endereço da Carteira (USDT BEP20)</Label><Input val="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7" /></div>
             <label className="flex items-center gap-3 cursor-pointer p-3 bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[var(--border-main)] text-[var(--blue-accent)] focus:ring-[var(--blue-accent)]" />
                <span className="text-xs font-semibold text-[var(--text-main)]">Exigir que o cliente informe a Hash da Transação (TxID)</span>
             </label>
          </div>
        </div>
      </div>

      {/* Preview Pane */}
      <div className="w-[420px] flex-shrink-0">
        <div className="sticky top-24 bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-6 shadow-md shadow-gray-200/20 dark:shadow-black/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-sm flex items-center gap-2 text-[var(--text-main)]">
              <User className="w-4 h-4 text-[var(--blue-accent)]" /> Portal do Cliente (Prévia)
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </div>
          
          <p className="text-xs font-medium text-[var(--text-sec)] mb-6 leading-relaxed">Simulação funcional de como o cliente visualizará as opções no momento do depósito.</p>
          
          <div className="grid gap-5">
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--blue-accent)]"></div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-disc)] mb-4">Depósito via PIX</h4>
              <div className="flex gap-4">
                  <div className="w-20 h-20 bg-white border border-gray-200 rounded-lg p-1.5 flex-shrink-0 shadow-sm">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=openfxpix" alt="QR" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                  </div>
                  <div className="flex flex-col justify-center gap-2 text-xs w-full">
                    <p className="font-semibold text-[var(--text-main)] text-[11px] uppercase tracking-wider text-[var(--text-sec)]">Chave PIX Copia e Cola</p>
                    <div className="bg-[var(--bg-panel)] p-2 rounded border border-[var(--border-soft)] font-mono flex justify-between items-center text-[11px] text-[var(--text-main)] hover:border-[var(--text-disc)] transition-colors cursor-pointer">
                      <span className="truncate w-32">pagamentos@openfx...</span> <span className="font-bold text-[var(--blue-accent)] uppercase text-[10px] tracking-widest">Copiar</span>
                    </div>
                  </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-5 shadow-sm relative transition-transform hover:-translate-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-disc)] mb-4">Transferência Bancária TED</h4>
              <div className="grid gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-[var(--border-soft)]">
                  <span className="text-[11px] font-semibold text-[var(--text-sec)] uppercase tracking-wider">Titular</span>
                  <span className="font-bold text-xs text-[var(--text-main)] text-right">OpenFx Payments Ltda</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[var(--border-soft)]">
                  <span className="text-[11px] font-semibold text-[var(--text-sec)] uppercase tracking-wider">Banco</span>
                  <span className="font-bold text-xs text-[var(--text-main)] text-right">BTG (208)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-[var(--text-sec)] uppercase tracking-wider">Ag / Conta</span>
                  <span className="font-mono text-xs font-bold text-[var(--text-main)] text-right">0001 / 765432-1</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-5 shadow-sm relative transition-transform hover:-translate-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-disc)] mb-4">Crypto Wallet (BEP20)</h4>
              <p className="text-[11px] font-semibold text-[var(--text-sec)] uppercase tracking-wider mb-2">Endereço USDT BEP20</p>
              <div className="bg-[var(--bg-panel)] p-3 rounded-lg border border-[var(--border-soft)] font-mono text-[10px] font-bold text-[var(--text-main)] break-all flex justify-between items-start hover:border-[var(--text-disc)] transition-colors cursor-pointer">
                  0x89205A3A3b2A69De6Dbf7f01...
                  <span className="ml-2 font-bold text-[var(--blue-accent)] uppercase text-[10px] tracking-widest flex-shrink-0">Copiar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------ UI UTILS ------ //

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-bold text-[var(--text-disc)] uppercase tracking-widest mb-2">{children}</label>;
}

function Input({ val }: { val: string }) {
  return <input type="text" defaultValue={val} className="w-full bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] font-medium p-2.5 rounded-lg text-xs focus:outline-none focus:border-[var(--blue-accent)] transition-colors shadow-sm" />;
}

function ArrowRightIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
