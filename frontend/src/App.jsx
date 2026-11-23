import React, { useMemo, useState } from 'react';
import { Activity, Brain, ChartColumn, ChevronRight, CircleHelp, Database, Dna, HeartPulse, Search, ShieldAlert } from 'lucide-react';

const diseases = [
  { id: 'LUAD', name: 'Lung cancer', organ: 'Lungs', color: '#52d4e8', genes: ['EGFR', 'KRAS', 'ALK', 'STK11', 'TP53'], note: 'Lung adenocarcinoma (TCGA-LUAD)' },
  { id: 'BRCA', name: 'Breast cancer', organ: 'Breast tissue', color: '#f17ca7', genes: ['BRCA1', 'BRCA2', 'ESR1', 'ERBB2', 'PIK3CA'], note: 'Breast invasive carcinoma (TCGA-BRCA)' },
  { id: 'COAD', name: 'Colon cancer', organ: 'Colon', color: '#b69aff', genes: ['APC', 'KRAS', 'BRAF', 'TP53', 'PIK3CA'], note: 'Colon adenocarcinoma (TCGA-COAD)' },
  { id: 'KIRC', name: 'Kidney cancer', organ: 'Kidneys', color: '#ffc36e', genes: ['VHL', 'PBRM1', 'SETD2', 'BAP1', 'TP53'], note: 'Clear cell renal cell carcinoma (TCGA-KIRC)' },
  { id: 'PRAD', name: 'Prostate cancer', organ: 'Prostate', color: '#78dfb5', genes: ['AR', 'FOXA1', 'PTEN', 'SPOP', 'TP53'], note: 'Prostate adenocarcinoma (TCGA-PRAD)' },
  { id: 'SARC', name: 'Sarcoma', organ: 'Soft tissue / bone', color: '#edaa78', genes: ['TP53', 'RB1', 'ATRX', 'MDM2', 'CDK4'], note: 'Sarcoma (TCGA-SARC)' },
];
const commonGenes = [...new Set(diseases.flatMap(d => d.genes))].sort();

function AnatomyMap({ active, accent }) {
  const organClass = name => `anatomy-organ${active === name ? ' highlighted' : ''}`;
  return <svg className="anatomy-svg" viewBox="0 0 400 620" role="img" aria-label={`Front view anatomical illustration with ${active} highlighted`} style={{ '--highlight': accent }}>
    <defs>
      <linearGradient id="skin" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f1c89d"/><stop offset=".5" stopColor="#dba477"/><stop offset="1" stopColor="#bd805d"/></linearGradient>
      <linearGradient id="cavity" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#553b3a"/><stop offset="1" stopColor="#342b31"/></linearGradient>
      <filter id="organ-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g className="body-silhouette">
      <path className="skin-shape" d="M175 91 Q151 91 132 103 L92 121 Q72 133 66 159 L53 211 Q49 228 62 232 Q75 235 80 219 L96 168 L101 238 Q103 259 109 278 L121 325 Q124 341 116 364 L106 416 Q103 431 116 435 L124 486 Q126 503 142 503 L152 493 L158 420 L170 366 L182 420 L188 493 Q199 508 214 499 Q221 496 222 484 L232 435 Q247 431 244 414 L232 363 Q225 340 229 323 L241 277 Q247 257 248 237 L254 168 L270 219 Q275 235 288 232 Q301 228 297 211 L284 159 Q278 133 258 121 L218 103 Q199 91 175 91 Z"/>
      <path className="skin-shape" d="M163 66 L163 104 Q181 116 199 104 L199 66 Z"/>
      <path className="skin-shape" d="M164 25 Q166 8 182 10 Q207 12 215 35 L214 65 Q210 88 189 91 Q166 88 160 66 Z"/>
      <path className="body-outline" d="M162 28 Q180 7 207 25 M162 38 Q176 45 188 34 L188 12 M188 36 L188 84 M169 54 Q178 61 187 55 M201 52 Q207 50 211 55 M170 70 Q182 75 194 69"/>
      <path className="inner-cavity" d="M131 128 Q170 113 209 128 L222 238 Q229 272 218 309 L207 361 Q200 384 186 390 L169 390 Q149 385 143 361 L122 309 Q111 271 119 238 Z"/>
      <path className="rib-lines" d="M128 145 Q170 127 212 145 M124 159 Q170 140 216 159 M122 174 Q170 154 218 174 M121 189 Q170 169 219 189 M122 204 Q170 185 218 204"/>
      <path className="spine" d="M169 107 L169 127 M169 202 L169 243 M169 315 L169 369"/>
    </g>
    <g className="organs">
      <path className={`${organClass('Breast tissue')} breast-organ`} d="M104 171 Q119 153 139 164 Q153 175 145 195 Q128 208 112 197 Z"/><path className={`${organClass('Breast tissue')} breast-organ`} d="M246 171 Q231 153 211 164 Q197 175 205 195 Q222 208 238 197 Z"/>
      <path className={`${organClass('Lungs')} lung-organ`} d="M162 142 Q149 122 136 140 Q125 159 128 192 Q130 215 148 214 Q163 211 166 192 Z"/><path className={`${organClass('Lungs')} lung-organ`} d="M176 142 Q189 122 202 140 Q213 159 210 192 Q208 215 190 214 Q175 211 172 192 Z"/>
      <path className="organ-detail" d="M132 177 Q148 177 162 164 M206 177 Q190 177 176 164 M168 139 L168 211 M158 165 L147 148 M180 165 L191 148"/>
      <path className="heart-organ" d="M169 171 C159 158 147 169 153 183 L169 203 L185 183 C191 169 179 158 169 171 Z"/>
      <path className={`${organClass('Liver')} liver-organ`} d="M127 222 Q148 209 169 220 Q174 241 162 259 Q139 265 123 250 Z"/>
      <path className={`${organClass('Stomach')} stomach-organ`} d="M184 220 Q204 216 208 234 Q213 255 196 264 Q180 266 178 248 Q176 232 184 220 Z"/>
      <path className="organ-detail" d="M169 207 L169 222 M180 227 Q188 231 196 226"/>
      <path className={`${organClass('Kidneys')} kidney-organ`} d="M126 267 Q109 258 109 278 Q110 298 127 302 Q141 297 138 280 Z"/><path className={`${organClass('Kidneys')} kidney-organ`} d="M214 267 Q231 258 231 278 Q230 298 213 302 Q199 297 202 280 Z"/>
      <path className="organ-detail" d="M137 283 Q150 287 159 300 M203 283 Q190 287 181 300"/>
      <path className={`${organClass('Colon')} colon-organ`} d="M145 275 Q134 270 134 285 L134 326 Q134 340 149 340 L191 340 Q206 340 206 326 L206 285 Q206 270 195 275 M147 284 L147 323 Q147 328 152 328 L188 328 Q193 328 193 323 L193 284"/>
      <path className="intestine-detail" d="M151 291 Q159 284 166 292 Q173 300 181 291 M151 304 Q158 296 166 305 Q174 313 183 303 M151 318 Q160 310 168 318 Q176 325 186 315"/>
      <ellipse className={`${organClass('Prostate')} prostate-organ`} cx="170" cy="357" rx="13" ry="9"/>
      <path className={`${organClass('Soft tissue / bone')} bone-organ`} d="M137 407 Q144 400 151 408 L148 480 Q143 489 136 480 Z M190 408 Q197 400 204 407 L205 480 Q198 489 192 480 Z"/>
    </g>
    <text x="170" y="603" textAnchor="middle" className="anatomy-caption">FRONT VIEW · ANATOMICAL ILLUSTRATION</text>
  </svg>;
}

export default function App() {
  const [page, setPage] = useState('Overview');
  const [selected, setSelected] = useState(diseases[0]);
  const [gene, setGene] = useState('EGFR');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(false);
  const filtered = useMemo(() => commonGenes.filter(g => g.includes(query.trim().toUpperCase())), [query]);
  const geneLinks = diseases.filter(d => d.genes.includes(gene));
  function choose(d) { setSelected(d); setGene(d.genes[0]); setResult(false); }
  function predict() {
    const linked = diseases.find(d => d.genes.includes(gene));
    if (linked) { setSelected(linked); setResult(true); }
    else setResult(false);
  }
  const nav = [['Overview', ChartColumn], ['Gene mapper', Dna], ['Cancer sites', HeartPulse]];
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-icon"><Activity size={21}/></div><div><b>OncoMap</b><small>GENOMIC RESEARCH</small></div></div><div className="side-label">WORKSPACE</div>{nav.map(([label, Icon]) => <button key={label} className={`nav-item ${page === label ? 'selected' : ''}`} onClick={() => setPage(label)}><Icon size={17}/>{label}<ChevronRight size={14}/></button>)}<div className="side-note"><span className="status-dot"/>Research prototype<small>Knowledge based · v2.0</small></div></aside>
    <main><header><div className="crumb">OncoMap <ChevronRight size={14}/><b>{page}</b></div><div className="header-actions"><span className="tag"><span className="status-dot"/>LOCAL KNOWLEDGE BASE</span><div className="avatar">O</div></div></header><div className="content">
      <section className="hero"><div><label>GENE-TO-ORGAN EXPLORER</label><h1>Map cancer biology to anatomy.</h1><p>Choose a tumor site and see the corresponding organ highlighted.</p></div><div className="hero-mark"><Dna size={28}/><span>ONCOMAP<br/>RESEARCH</span></div></section>
      {page === 'Gene mapper' ? <div className="mapper-layout"><section className="card mapper-card"><div className="card-heading"><div><h2>Gene association mapper</h2><p>Choose a gene to inspect linked tumor cohorts and anatomical sites.</p></div><span className="eyebrow">CURATED LOOKUP</span></div><label className="input-label" htmlFor="gene-search">SEARCH A GENE</label><div className="searchbox"><Search size={17}/><input id="gene-search" value={query} onChange={e => {const value=e.target.value.toUpperCase();setQuery(value);if(commonGenes.includes(value))setGene(value);setResult(false)}} placeholder="Try EGFR, BRCA1, VHL…" list="gene-list" onKeyDown={e => {if(e.key === 'Enter' && filtered[0]){setGene(filtered.find(g=>g===query.toUpperCase()) || filtered[0]);setResult(false)}}}/><datalist id="gene-list">{filtered.map(g => <option key={g} value={g}/>)}</datalist></div><label className="input-label">COMMON RESEARCH GENES</label><div className="gene-chips">{filtered.map(g => <button key={g} className={gene === g ? 'active' : ''} onClick={() => {setGene(g);setQuery(g);setResult(false)}}>{g}</button>)}</div><button className="primary-button" onClick={predict}><Dna size={16}/> Map gene to tumor site</button><p className="disclaimer">This is a gene-to-cohort knowledge lookup, not a patient-level cancer prediction.</p></section><section className="card result-card"><div className="card-heading"><div><h2>Association result</h2><p>{result ? 'Matching cohort and anatomical site' : 'Select a gene to see mapped associations'}</p></div><span className="result-symbol"><HeartPulse size={19}/></span></div>{geneLinks.length ? <div className="association-list">{geneLinks.map(d => <button key={d.id} className={`association ${selected.id === d.id ? 'chosen' : ''}`} onClick={() => choose(d)}><span className="assoc-dot" style={{background:d.color}}/><span><b>{gene} <i>↔</i> {d.id}</b><small>{d.name} · {d.organ}</small></span><ChevronRight size={16}/></button>)}</div> : <div className="empty-state"><CircleHelp/><b>No association in this starter map</b><span>Try a listed gene or supply a validated gene-to-disease reference dataset.</span></div>}<div className="result-foot"><ShieldAlert size={15}/> Associations are educational and do not establish diagnosis, causation, or individual risk.</div></section></div> : <div className="dashboard-grid"><section className="card model-card"><div className="card-heading"><div><h2>2D organ map</h2><p>Select a cancer site to highlight its organ.</p></div><span className="eyebrow"><HeartPulse size={13}/> 2D ORGAN MAP</span></div><div className="model-stage"><AnatomyMap active={selected.organ} accent={selected.color}/><div className="model-overlay"><span className="glow-dot" style={{background:selected.color}}/>{selected.organ}</div></div><div className="site-legend">{diseases.map(d => <button key={d.id} className={selected.id === d.id ? 'active' : ''} onClick={() => choose(d)}><i style={{background:d.color}}/>{d.id}</button>)}</div></section>
        <section className="card site-card"><div className="card-heading"><div><h2>Cancer site explorer</h2><p>Choose a cohort to highlight its primary site.</p></div><span className="eyebrow">6 COHORTS</span></div><div className="site-list">{diseases.map(d => <button key={d.id} className={`site-row ${selected.id === d.id ? 'active' : ''}`} onClick={() => choose(d)}><span className="site-badge" style={{color:d.color,background:`${d.color}18`}}>{d.id}</span><span className="site-copy"><b>{d.name}</b><small>{d.organ}</small></span><ChevronRight size={15}/></button>)}</div><div className="selected-site" style={{'--accent':selected.color}}><span>SELECTED SITE</span><b>{selected.organ}</b><small>{selected.note}</small><div className="gene-list-label">ASSOCIATED GENES</div><div className="gene-tags">{selected.genes.map(g => <button key={g} onClick={() => {setGene(g);setPage('Gene mapper');setResult(false)}}>{g}</button>)}</div></div></section></div>}
      <section className="trust-row"><div><Database size={16}/><span><b>No trained model bundled</b><small>Training requires real, labeled expression data.</small></span></div><div><Brain size={16}/><span><b>No fabricated confidence scores</b><small>Gene associations are shown without accuracy claims.</small></span></div><div><ShieldAlert size={16}/><span><b>Research use only</b><small>Not for diagnosis or treatment decisions.</small></span></div></section>
      <footer>OncoMap <span>Educational research prototype · Not a clinical diagnostic tool</span></footer>
    </div></main></div>;
}
