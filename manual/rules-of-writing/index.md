---
title: บทบัญญัติการเขียน
---

## ว่าด้วยเรื่องหัวข้อ

**กฎการใช้:**

- หัวข้อใหญ่จะถูกถึงข้อมูลจาก `title` ด้านบน
- หัวข้อรองต้องเริ่มจาก `##` H2 เสมอ
- หัวข้อจะต้องไล่จาก ใหญ่ไปเล็ก เสมอ

## การไฮไลท์ข้อมูล

**ชื่อทางการ:** `Admonitions`, `Callouts`

**กรณีที่ใช้:**
- ไฮไลท์ข้อมูลสำคัญ

```
:::note
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::tip
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::info
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::warning
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::danger
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::
```

:::note
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::tip
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::info
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::warning
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::danger
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

## กล่องอ้างอิง

**ชื่อทางการ:** `Blockquote`, `Callouts`
**กรณีที่ใช้:**
- อาจมาจากคนอื่น, จากหนังสือ, หรือข้อความสำคัญที่ต้องการเน้น

> ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น - ไสยบาบา

## การเขียนลำดับการทำอะไรซักอย่าง

- ให้ใช้ สิ่งนี้ ที่เรียกว่า Un-ordered list
- แล้วก็ไล่ลงไปเรื่อยๆ
- หากให้กดปุ่ม ก็ใช้ `Pay Now` เน้นชื่อของปุ่ม

## การใส่รูป

- ให้เปลี่ยน `some-doc.md` เป็นโฟลเดอร์ `some-doc`
- สร้างไฟล์ชื่อ `index.md` และก็ใช้ไฟล์นั้นในการเขียนคู่มือ
- สร้างโฟลเดอร์ `img` ใน `some-doc`

สิ่งที่จะได้จะเป็นประมาณนี้

```
└ some-doc
  ├ index.md
  └ img
    └ cat.png
```

และเพิ่มรูปด้วยการ

```
![](./img/cat.png)
```

![แมวอารมณ์เสียในซุปต้มยำกุ้ง](./img/cat.png)

## การลิ้งไปไฟล์อื่น

```
[ตรงนี้จะเป็น Text ที่แสดง](/rules-of-writing/linking-to-another-file-example.md)
```

[ตรงนี้จะเป็น Text ที่แสดง](/rules-of-writing/linking-to-another-file-example.md)