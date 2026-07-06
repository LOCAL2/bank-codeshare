import { useState } from 'react'
import './App.css'

// ── Syntax highlighter (no external deps) ──────────────────────────────────
function highlight(code: string): string {
  return code
    // strings (single/double/triple quote)
    .replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
      '<span class="tok-str">$1</span>')
    // comments
    .replace(/(#.*)/g, '<span class="tok-cmt">$1</span>')
    // keywords
    .replace(/\b(import|from|def|return|if|elif|else|while|for|in|try|except|raise|break|continue|exit|and|or|not|True|False|None|int|input|print)\b/g,
      '<span class="tok-kw">$1</span>')
    // built-in functions / types
    .replace(/\b(ValueError|TypeError|Exception)\b/g,
      '<span class="tok-cls">$1</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>')
    // operators
    .replace(/([+\-*/%=<>!]+)/g, '<span class="tok-op">$1</span>')
}

// ── Data ─────────────────────────────────────────────────────────────────────
const bankModuleCode = `account_name = "แก้ไขเป็นชื่อตัวเอง"
account_password = "1234"
balance = 1000 + 14


def check_password(password):
    if password == account_password:
        return True
    return False

def deposit(balance, amount):
    if amount <= 100:
        raise ValueError("จำนวนเงินต้องฝากมากกว่า 100 บาท")
    balance = balance + amount
    return balance

def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("จำนวนเงินที่ถอนต้องมากกว่า 0 บาท")
    if amount > balance:
        raise ValueError("ยอดเงินคงเหลือไม่เพียงพอ")
    balance = balance - amount
    return balance`

const mainCode = `import bank_module

name = input("ชื่อบัญชี: ")
password = input("รหัสผ่าน: ")

if name != bank_module.account_name or password != bank_module.account_password:
    print("ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง")
    exit()

balance = bank_module.balance

while True:
    print("1.ฝากเงิน  2.ถอนเงิน  3.ยอดเงิน  4.ออก")
    choice = input("เลือกเมนู: ")

    try:
        choice = int(choice)
    except:
        print("กรุณาป้อนตัวเลข")
        continue

    if choice == 1:
        try:
            amount = int(input("จำนวนเงินที่ฝาก: "))
            balance = bank_module.deposit(balance, amount)
            print("ยอดเงินคงเหลือ:", balance, "บาท")
        except:
            print("จำนวนเงินต้องฝากมากกว่า 100 บาท")

    elif choice == 2:
        if input("ใส่รหัสผ่าน: ") != bank_module.account_password:
            print("รหัสผ่านไม่ถูกต้อง")
            continue
        try:
            amount = int(input("จำนวนเงินที่ถอน: "))
            balance = bank_module.withdraw(balance, amount)
            print("ยอดเงินคงเหลือ:", balance, "บาท")
        except:
            print("ยอดเงินไม่เพียงพอหรือจำนวนเงินไม่ถูกต้อง")

    elif choice == 3:
        print("ยอดเงินคงเหลือ:", balance, "บาท")

    elif choice == 4:
        print("ออกจากโปรแกรม")
        break

    else:
        print("กรุณาเลือกเมนู 1-4")`

// ── Sub-components ────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy} aria-label="Copy code">
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function CodeBlock({ filename, code, badge }: { filename: string; code: string; badge?: string }) {
  const lines = code.split('\n')

  return (
    <div className="code-card">
      <div className="code-card-header">
        <div className="header-left">
          <div className="traffic-lights">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="filename">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 5, opacity: 0.7 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            {filename}
          </span>
          {badge && <span className="badge">{badge}</span>}
        </div>
        <div className="header-right">
          <span className="lang-tag">Python</span>
          <CopyButton text={code} />
        </div>
      </div>
      <div className="code-body">
        <div className="line-numbers" aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre
          className="code-content"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </div>
    </div>
  )
}

function EditHint() {
  return (
    <div className="edit-hint">
      <div className="edit-hint-icon">⚠️</div>
      <div className="edit-hint-content">
        <p className="edit-hint-title">จุดที่ต้องแก้ไขใน <code>bank_module.py</code></p>
        <div className="edit-hint-items">
          <div className="hint-item">
            <span className="hint-line"><code>account_name = "แก้ไขเป็นชื่อตัวเอง"</code></span>
            <span className="hint-arrow">← เปลี่ยนชื่อ</span>
          </div>
          <div className="hint-item">
            <span className="hint-line"><code>account_password = "1234"</code></span>
            <span className="hint-arrow">← เปลี่ยนรหัสผ่าน</span>
          </div>
          <div className="hint-item">
            <span className="hint-line"><code>balance = 1000 + 14</code></span>
            <span className="hint-arrow">← เปลี่ยน 14 เป็นเลขที่ตัวเอง</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RunInstructions() {
  return (
    <div className="run-section">
      <div className="run-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        วิธีรัน
      </div>
      <ol className="run-steps">
        <li>วางไฟล์ทั้งสองไว้ในโฟลเดอร์เดียวกัน</li>
        <li>
          รันคำสั่ง:
          <span className="inline-cmd">
            <code>python main.py</code>
            <CopyButton text="python main.py" />
          </span>
        </li>
      </ol>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      {/* Background grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🏦</span>
            <span className="logo-text">Bank<span className="logo-accent">System</span></span>
          </div>
          <nav className="header-nav">
            <span className="nav-chip">Python 3</span>
            <span className="nav-chip">Source Code</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Source Code Guide
          </div>
          <h1 className="hero-title">
            Bank System
            <br />
            <span className="gradient-text">Source Code</span>
          </h1>
          <p className="hero-desc">
            โปรแกรมระบบธนาคารเขียนด้วย Python — มีฟีเจอร์ฝากเงิน ถอนเงิน และตรวจสอบยอดคงเหลือ
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="content">
        <EditHint />

        <section className="file-section">
          <div className="section-label">
            <span className="section-num">01</span>
            <span className="section-title">bank_module.py</span>
            <span className="section-desc">— Logic หลักของระบบธนาคาร</span>
          </div>
          <CodeBlock
            filename="bank_module.py"
            code={bankModuleCode}
            badge="แก้ไขก่อนส่ง"
          />
        </section>

        <section className="file-section">
          <div className="section-label">
            <span className="section-num">02</span>
            <span className="section-title">main.py</span>
            <span className="section-desc">— จุดเริ่มต้นของโปรแกรม</span>
          </div>
          <CodeBlock
            filename="main.py"
            code={mainCode}
          />
        </section>

        <RunInstructions />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <span>Bank System — Source Code Guide</span>
        <span className="footer-sep">·</span>
        <span>Python 3</span>
      </footer>
    </div>
  )
}

export default App
