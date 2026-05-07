# E-Commerce Node.js API

مشروع API لإدارة منصة مدرسة إلكترونية بسيطة باستخدام Node.js وExpress وMySQL.

---

## نظرة عامة

هذا المشروع يقدم واجهة برمجية لإدارة المستخدمين والدورات  مع حماية JWT ودعم اللغة العربية والإنجليزية.

---

## الميزات الرئيسية

- تسجيل مستخدمين وتسجيل دخول آمن
- حماية المسارات باستخدام JWT
- إنشاء واسترجاع وتحديث الدورات
- دعم اللغة العربية والإنجليزية تلقائيا
- اتصال بقاعدة بيانات MySQL عبر Sequelize
- إعداد Swagger جاهز لتوثيق API

---

## التقنيات المستخدمة

- Node.js
- Express.js
- MySQL
- Sequelize
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- dotenv
- swagger-jsdoc
- swagger-ui-express
- nodemon

---

## هيكل المشروع

```
school_app_node_js/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── courses.controller.js
│   ├── locales/
│   │   ├── ar.js
│   │   └── en.js
│   ├── middlewares/
│   │   ├── auth.middlewares.js
│   │   └── lang.middleware.js
│   ├── models/
│   │   ├── courses.model.js
│   │   ├── enrollments.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── courses.routes.js
│   │   └── enrolments.routes.js
│   ├── services/
│   └── utils/
│       └── generate_token.js
├── swagger.js
└── package.json
```

---

## المتطلبات

- Node.js
- MySQL
- npm

---

## التثبيت

1. انتقل إلى مجلد المشروع:

```bash
cd school_app_node_js
```

2. ثبت الحزم:

```bash
npm install
```

3. أنشئ ملف `.env` بالمحتوى التالي:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=school_db
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_secret_key
```

---

## التشغيل

### للتطوير

```bash
npm run dev
```

### للإنتاج

```bash
node src/server.js
```

### النتيجة المتوقعة

```
✅ Database connected
✅ Models synced
🚀 Server running on http://localhost:5000
```

---

## مسارات API

### DataBase

```
http://localhost:5000/api
```

### المصادقة

- `POST /api/auth/register`
  - تسجيل مستخدم جديد
  - بيانات الطلب: `name`, `email`, `password`
- `POST /api/auth/login`
  - تسجيل الدخول واسترجاع رمز JWT
  - بيانات الطلب: `email`, `password`

### الدورات / المنتجات

- `POST /api/cources/`
  - إنشاء دورة أو منتج جديد
  - يتطلب JWT
- `GET /api/cources/`
  - استرجاع الدورات وحالة التسجيل للمستخدم
  - يتطلب JWT
- `PATCH /api/cources/:id`
  - تعديل بيانات دورة
  - يتطلب JWT

> الملاحظة: مسار الدورات الفعلي في التطبيق هو `/api/cources` حسب تعريف `src/app.js`.

---

## المصادقة

أضف الهيدر التالي للطلبات المحمية:

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## الدعم اللغوي

يتم تحديد اللغة من خلال رأس `Accept-Language`:

- `ar` للغة العربية
- أي قيمة أخرى للغة الإنجليزية

الترجمات في:

- `src/locales/ar.js`
- `src/locales/en.js`

---

## Swagger

هناك إعداد Swagger جاهز في `swagger.js`. يمكن ربطه بالتطبيق لتوفير واجهة وثائق عبر `/api-docs`.

---

## ملاحظات

- بعض النماذج مثل `enrollments` و`favorites` و`cart` موجودة لكنها ليست مفعلة بالكامل في المسارات الحالية.
- يجب وضع قيمة سليمة في `JWT_SECRET` لحماية الرموز.

---

## سكريبتات npm

- `npm run dev` - تشغيل المشروع مع إعادة تشغيل تلقائية
- `npm test` - سكريبت اختبار افتراضي

---

## الاعتمادات

- Express
- Sequelize
- MySQL2
- bcrypt
- jsonwebtoken
- express-validator
- dotenv
- swagger-jsdoc
- swagger-ui-express
- nodemon
