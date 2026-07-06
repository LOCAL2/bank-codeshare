import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './App.css'

// ── Data ──────────────────────────────────────────────────────────────────────
const bankModuleCode = `account_name = "แก้ไขเป็นชื่อตัวเองนะครับ"
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
            print("ยอดเงินไม่เพียงพอ")

    elif choice == 3:
        print("ยอดเงินคงเหลือ:", balance, "บาท")

    elif choice == 4:
        print("ออกจากโปรแกรม")
        break

    else:
        print("กรุณาเลือกเมนู 1-4")`

// ── CodeBlock ─────────────────────────────────────────────────────────────────
function CodeBlock({ filename, code, badge }: { filename: string; code: string; badge?: string }) {
  return (
    <div className="code-card">
      <div className="code-card-header">
        <div className="header-left">
          <span className="filename">{filename}</span>
          {badge && <span className="badge">{badge}</span>}
        </div>
      </div>

      <SyntaxHighlighter
        language="python"
        style={{
          ...vscDarkPlus,
          'token string-interpolation': { color: '#e2e8f0' },
          'string': { color: '#e2e8f0' },
          'attr-value': { color: '#e2e8f0' },
        }}
        showLineNumbers
        lineNumberStyle={{
          minWidth: '2.8em',
          paddingRight: '1em',
          color: 'rgba(255,255,255,0.85)',
          userSelect: 'none',
          fontSize: '12.5px',
          fontStyle: 'normal',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          marginRight: '1em',
        }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#13161d',
          fontSize: '13px',
          lineHeight: '1.75',
          padding: '18px 20px',
          overflowX: 'auto',
        }}
        codeTagProps={{ style: { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace", fontVariantLigatures: 'none' } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <div className="bg-grid" aria-hidden="true" />

      <main className="content">

        {/* Warning */}
        <div className="edit-hint">
          <div className="edit-hint-icon-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="edit-hint-body">
            <p className="edit-hint-title">แก้ไขใน <code>bank_module.py</code> ด้วยนะครับเพื่อนๆ</p>
            <div className="hint-code">
              <div className="hint-code-row"><span className="hc-code">account_name = "แก้ไขเป็นชื่อตัวเองนะครับ"</span><span className="hc-comment"># ← เปลี่ยนชื่อ</span></div>
              <div className="hint-code-row"><span className="hc-code">account_password = "1234"</span><span className="hc-comment"># ← เปลี่ยนรหัสผ่าน</span></div>
              <div className="hint-code-row"><span className="hc-code">balance = 1000 + 14</span><span className="hc-comment"># ← เปลี่ยน 14 เป็นเลขประจำตัวนักศึกษาของตัวเอง</span></div>
            </div>
          </div>
        </div>

        {/* File 01 */}
        <section className="file-section">
          <CodeBlock filename="bank_module.py" code={bankModuleCode} />
        </section>

        {/* File 02 */}
        <section className="file-section">
          <CodeBlock filename="main.py" code={mainCode} />
        </section>

      </main>
    </div>
  )
}

export default App
