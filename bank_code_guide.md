# 🏦 Bank System — Source Code

## ⚠️ จุดที่ต้องแก้ไขใน `bank_module.py`

```python
account_name = "แก้ไขเป็นชื่อตัวเอง"   # ← เปลี่ยนชื่อ
account_password = "1234"               # ← เปลี่ยนรหัสผ่าน
balance = 1000 + 14                     # ← เปลี่ยน 14 เป็นเลขที่ตัวเอง
```

---

## 📄 `bank_module.py`

```python
account_name = "แก้ไขเป็นชื่อตัวเอง"
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
    return balance
```

---

## 📄 `main.py`

```python
import bank_module

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
        print("กรุณาเลือกเมนู 1-4")
```

---

## 🚀 วิธีรัน

1. วางไฟล์ทั้งสองไว้ในโฟลเดอร์เดียวกัน
2. รันคำสั่ง: `python main.py`
