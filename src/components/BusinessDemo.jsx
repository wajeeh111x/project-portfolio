import { useState } from 'react';
import './BusinessDemo.css';

const samples = {
  retail: { name: 'Retail sales', file: 'retail-sales-sample.csv', revenue: [18200, 21500, 19800, 26400, 29100, 35000], orders: [120, 142, 131, 165, 184, 218], margin: 28, products: [['Accessories', 42], ['Electronics', 35], ['Home & living', 23]] },
  studio: { name: 'Creative studio', file: 'studio-sales-sample.csv', revenue: [12000, 18000, 16000, 22000, 24000, 28000], orders: [6, 9, 8, 11, 12, 14], margin: 40, products: [['Web design', 50], ['Brand identity', 30], ['Consulting', 20]] },
};
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const pages = ['Dashboard', 'Datasets', 'AI Analyst', 'Insights'];
const icons = ['◫', '▤', '✧', '◈'];

export default function BusinessDemo() {
  const [page, setPage] = useState('Dashboard');
  const [sample, setSample] = useState('retail');
  const [period, setPeriod] = useState('6');
  const [question, setQuestion] = useState('');
  const data = samples[sample];
  const start = 6 - Number(period);
  const values = data.revenue.slice(start);
  const labels = months.slice(start);
  const revenue = values.reduce((sum, n) => sum + n, 0);
  const orders = data.orders.slice(start).reduce((sum, n) => sum + n, 0);
  const growth = ((values.at(-1) / values[0] - 1) * 100).toFixed(1);
  const insights = [
    { title: 'Revenue is trending up', body: `${data.name} revenue grew ${growth}% from ${labels[0]} to Jun in this sample. June generated ${money(values.at(-1))}.`, tag: 'Growth' },
    { title: `${data.products[0][0]} leads the mix`, body: `This category represents ${data.products[0][1]}% of sample revenue. Compare its performance with the other categories before changing your strategy.`, tag: 'Product mix' },
    { title: 'Keep an eye on profitability', body: `At a sample margin of ${data.margin}%, estimated profit is ${money(revenue * data.margin / 100)} across the selected period.`, tag: 'Profitability' },
  ];
  const answers = {
    revenue: insights[0].body,
    products: insights[1].body,
    profit: insights[2].body,
  };
  function download() {
    const csv = 'month,revenue,orders\n' + months.map((month, i) => `${month},${data.revenue[i]},${data.orders[i]}`).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = data.file; anchor.click(); URL.revokeObjectURL(url);
  }
  return <div className="bos">
    <aside className="bos-sidebar">
      <a className="bos-brand" href="/projects/business-os"><span>✦</span><div>Business OS<small>INTELLIGENCE WORKSPACE</small></div></a>
      <div className="bos-workspace"><span>W</span><div>Wajeeh's workspace<small>Portfolio demonstration</small></div></div>
      <p className="bos-nav-label">WORKSPACE</p>
      <nav aria-label="Demo navigation">{pages.map((item, i) => <button key={item} aria-current={page === item ? 'page' : undefined} onClick={() => setPage(item)}><span aria-hidden="true">{icons[i]}</span>{item}</button>)}</nav>
      <div className="bos-side-footer"><div className="bos-status">● Frontend demo</div><p>Explore with fictional business data. No account required.</p><a href="/projects/business-os">← Back to project</a><a href="https://github.com/wajeeh111x/Multi-Agent-Business-OS" target="_blank" rel="noreferrer">View GitHub repository ↗</a></div>
    </aside>
    <main className="bos-main">
      <header className="bos-top"><span>Workspace <b>/ {page}</b></span><span className="bos-avatar" aria-label="Demo workspace">W</span></header>
      <div className="bos-content">
        <div className="bos-notice"><span>DEMO MODE</span> Sample data only · No live AI, accounts, or uploads</div>
        <div className="bos-heading"><div><p className="bos-eyebrow">YOUR BUSINESS, AT A GLANCE</p><h1>{page === 'Dashboard' ? 'Business overview' : page}</h1><p>{page === 'Dashboard' ? 'Turn everyday numbers into a clearer picture.' : 'Explore the Business OS experience with sample data.'}</p></div><label>Sample dataset<select value={sample} onChange={e => {setSample(e.target.value); setQuestion('');}}><option value="retail">Retail sales</option><option value="studio">Creative studio</option></select></label></div>
        {(page === 'Dashboard' || page === 'Insights') && <label className="bos-period">Reporting period <select value={period} onChange={e => setPeriod(e.target.value)}><option value="6">Jan–Jun 2026</option><option value="3">Apr–Jun 2026</option></select></label>}
        {page === 'Dashboard' && <>
          <div className="bos-kpis">{[['Total revenue', money(revenue), `${growth}% growth across period`], ['Estimated profit', money(revenue * data.margin / 100), `${data.margin}% sample margin`], ['Total orders', orders.toLocaleString('en-US'), `${labels[0]} – Jun 2026`], ['Average order', money(revenue / orders), 'Revenue ÷ orders']].map(([title, value, note]) => <article key={title}><span>{title}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
          <div className="bos-chart-grid"><section className="bos-card"><div className="bos-card-head"><div><h2>Revenue trend</h2><p>Monthly performance · USD</p></div><span className="bos-pill">Sample data</span></div><div className="bos-graph"><div className="bos-scale"><span>{money(Math.max(...values))}</span><span>{money(Math.max(...values) / 2)}</span><span>$0</span></div><div className="bos-plot"><svg viewBox="0 0 600 220" role="img" aria-label={`Revenue from ${labels[0]} to June: ${values.map(money).join(', ')}`}><defs><linearGradient id="bos-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7475ff" stopOpacity=".35"/><stop offset="100%" stopColor="#7475ff" stopOpacity="0"/></linearGradient></defs>{[20, 110, 200].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#273043" strokeDasharray="4 5"/>)}<path d={`M ${values.map((v, i) => `${i * 580 / (values.length - 1) + 10},${200 - v / Math.max(...values) * 180}`).join(' L ')} L590,220 L10,220 Z`} fill="url(#bos-fill)"/><polyline points={values.map((v, i) => `${i * 580 / (values.length - 1) + 10},${200 - v / Math.max(...values) * 180}`).join(' ')} fill="none" stroke="#9391ff" strokeWidth="3"/>{values.map((v, i) => <circle key={i} cx={i * 580 / (values.length - 1) + 10} cy={200 - v / Math.max(...values) * 180} r="5" fill="#b8b5ff"><title>{labels[i]}: {money(v)}</title></circle>)}</svg><div className="bos-months">{labels.map(label => <span key={label}>{label}</span>)}</div></div></div></section>
          <section className="bos-card"><h2>Revenue by category</h2><p>Sample business mix</p><div className="bos-categories">{data.products.map(([name, percent]) => <div key={name}><div><span>{name}</span><strong>{percent}%</strong></div><div className="bos-track"><div style={{width: `${percent}%`}}/></div></div>)}</div><p className="bos-footnote">A fictional dataset, built for exploring the interface.</p></section></div>
          <section className="bos-card"><div className="bos-card-head"><div><h2>✧ Business signals</h2><p>A closer look at your sample performance</p></div><button className="bos-text-button" onClick={() => setPage('Insights')}>All insights →</button></div><div className="bos-insights">{insights.map(item => <article key={item.title}><span className="bos-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
        </>}
        {page === 'Datasets' && <section className="bos-card"><div className="bos-card-head"><div><h2>{data.file}</h2><p>6 monthly records · Fictional sample · January–June 2026</p></div><button className="bos-primary" onClick={download}>Download sample CSV ↓</button></div><div className="bos-table-wrap"><table><thead><tr><th>Month</th><th>Revenue</th><th>Orders</th><th>Average order</th></tr></thead><tbody>{months.map((month, i) => <tr key={month}><td>{month} 2026</td><td>{money(data.revenue[i])}</td><td>{data.orders[i]}</td><td>{money(data.revenue[i] / data.orders[i])}</td></tr>)}</tbody></table></div><p className="bos-footnote">Uploads are unavailable in this frontend demo. Switch between the two included datasets above.</p></section>}
        {page === 'AI Analyst' && <section className="bos-card bos-analyst"><div className="bos-spark">✧</div><h2>Explore your business questions</h2><p>Choose an example to preview the analyst experience.</p><p className="bos-footnote">These are predefined sample responses, not live AI output.</p><div className="bos-prompts">{[['revenue', 'How is revenue trending?'], ['products', 'Which category leads sales?'], ['profit', 'What is the profit margin?']].map(([id, label]) => <button key={id} aria-pressed={question === id} onClick={() => setQuestion(id)}>{label} ↗</button>)}</div><div aria-live="polite">{question && <article className="bos-answer"><span className="bos-tag">EXAMPLE RESPONSE · {data.name}</span><p>{answers[question]}</p><small>Based on the selected sample and reporting period. No AI service was called.</small></article>}</div></section>}
        {page === 'Insights' && <div className="bos-insight-list">{insights.map((item, i) => <article className="bos-card" key={item.title}><span className="bos-tag">0{i + 1} / {item.tag}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</div>}
        <footer className="bos-footer">BUSINESS OS <span>Designed by Syed Wajeeh · Frontend portfolio demo</span></footer>
      </div>
    </main>
  </div>;
}
