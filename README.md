# Quiz #2 - RESTful API

### ป้อนข้อมูลนักศึกษา

รหัส นศ.: 680610695

ชื่อ-สกุล : นายปารวิญ ปิตาลีมาพร

---
- ให้ นศ. ทำการ Fork repo นี้ไปเป็นของ นศ. โดยให้กำหนดชื่อในรูปแบบ <github_username>/quiz2**xx**-<student_id> โดย **xx** คือ **หมายเลขที่นั่งของ นศ.**
  - เช่น  `awesome_code/quiz207-680610999` (เลขที่นั่ง คือ `7`)
- ให้ นศ. Clone โค้ดจาก repo ของ นศ. แล้ว ให้เปิดโฟลเดอร์ด้วย VSCode และรันคำสั่งต่อไปนี้ใน terminal:

```bash
pnpm install
pnpm approve-builds
pnpm run dev
```

เมื่อนักศึกษาทำเสร็จแล้ว ให้ทำการ push ส่งคืนใน repo ของ นศ. แล้วนำ Repo URL ไปแจ้งใน Google Form ต่อไปนี้

https://forms.gle/p3a4pjK5JyqHob476

**หมายเหตุ** ใน quiz นี้ นศ. ไม่ต้อง deploy ขึ้น Vercel

---
=============================================================================
MY NOTE

1. Project Setup (in Terminal)
- mkdir <name folder(want to build)>  : ใช้สำหรับ สร้างโฟลเดอร์ใหม่
- cd <folder name> : ใช้สำหรับ ย้ายตำแหน่งโฟกัส (เปลี่ยนโฟลเดอร์)
- git clone <link Github> : ใช้สำหรับคัดลอกโปรเจกจาก GitHub มาไว้ในเครื่องของเรา
- pnpm install : ใช้เพื่อติดตั้งแพ็กเกจทั้งหมด
- pnpm i -D typescript @tsconfig/node-lts @tsconfig/node-ts tsx tsc-alias
- pnpm i -D @types/node @types/express @types/cors @types/morgan @types/debug cross-env - - - nodemon
- pnpm i jsonwebtoken bcrypt dotenv
- pnpm i -D @types/jsonwebtoken @types/bcrypt
หากระบบให้ pnpm approve-builds แล้วจะต้องกด Spacebar เพื่อเลือกก่อนกด Enter

-----------------------------------------
2. เมื่อ CloneGit&Setup เสร็จสิ้น
จะทำการ Check ไฟล์ Database(db.ts) ต่าง ๆ และเปลี่ยนนามสกุลตรง import ต่าง ๆ จาก .ts เป็น .js เพื่อไม่ให้เกิด error

-----------------------------------------
3. กรณีสร้าง Router เพิ่ม
เมื่อทำการสร้างไฟล์ใน folder routes ใหม่ อย่าลืม import ไฟล์ที่สร้างลงในไฟล์ index.ts แล้วใช้ app.use(...) เพื่อเรียกใช้ด้วยเสมอ

-----------------------------------------
4. VERCEL Framework Settings

- Framework Preset : Express
- Build Command : pnpm exec tsc && pnpm exec tsc-alias
- Output Directory : dist
- Install Command : pnpm install
- Add ENABLE_EXPERIMENTAL_COREPACK
- environment variable : 1

-----------------------------------------
เพิ่มเติม : คำสั่งต่าง ๆ ที่ใช้ในการจัดการข้อมูลต่าง ๆ

.reduce() -> มัดรวมข้อมูลทั้ง Array ให้เหลือค่าเดียว (เช่น หาผลรวม, นับจำนวน, แปลงโครงสร้าง)
------
typescript :
------
// หาผลรวมราคาสินค้าทั้งหมด
const totalPrice: number = products.reduce((sum, p) => sum + p.price, 0);
// 0 คือค่าเริ่มต้น (Initial Value)
------

.map() -> สร้าง Array ใหม่จากการแปลงข้อมูล
ใช้เมื่อต้องการแปลงหน้าตาข้อมูล เช่น ต้องการแค่รายชื่อสินค้าทั้งหมด
------
typescript :
------
const productNames: string[] = products.map(p => p.name);
// ผลลัพธ์: ['Laptop', 'Mouse', 'Keyboard']
------

.filter() -> คัดกรองเอาเฉพาะตัวที่ผ่านเงื่อนไข
ใช้เมื่อต้องการเลือกเฉพาะข้อมูลที่ต้องการ เช่น สินค้าที่ราคาเกิน 1,000 บาท
------
typescript :
------
const expensive: Product[] = products.filter(p => p.price > 1000);
// ผลลัพธ์: [{ id: 1, name: 'Laptop', ... }, { id: 3, name: 'Keyboard', ... }]
------

.find() -> หาตัวแรกที่ตรงเงื่อนไข
ใช้เมื่อต้องการหา object ตัวเดียว หากไม่เจอจะเป็น undefined เช่น หาตัวที่ id คือ 2
------
typescript :
------
const target: Product | undefined = products.find(p => p.id === 2);
// ผลลัพธ์: { id: 2, name: 'Mouse', price: 500 }
------

.includes() -> เช็คว่ามีค่านี้อยู่หรือไม่
ใช้กับ Array ของค่าพื้นฐาน (Primitive typed) เพื่อเช็คความถูกต้อง (ใช้กับ Object โดยตรงไม่ได้)
------
typescript :
------
const tags: string[] = ['tech', 'gadget', 'office'];

const hasTech: boolean = tags.includes('tech'); // true
const hasFood: boolean = tags.includes('food'); // false
------

.slice() -> ตัดแบ่งเอาบางส่วน
ใช้คัดลอกหรือตัด Array โดยระบุ (ตำแหน่งเริ่มต้น, ตำแหน่งสิ้นสุดแต่ไม่รวมตัวสิ้นสุด)
------
typescript :
------
const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

const subList = fruits.slice(1, 3);
// เริ่มตำแหน่งที่ 1 (Banana) ถึงก่อนตำแหน่งที่ 3 (Orange)
// ผลลัพธ์: ['Banana', 'Orange']
------