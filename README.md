# ☀️ StarSolarEnergy — Official Website & Management System

A high-performance, future-proof, responsive web platform engineered for **StarSolarEnergy**, specializing in Tier-1 Solar Panels, Hybrid & On-Grid Inverters, Lithium & Deep-Cycle Batteries, and Turnkey Solar Packages.

---

## 🚀 Key Features

### 1. ⚡ One-Click WhatsApp Ordering & Inquiry
- **Product-Specific Inquiries**: Every solar panel, inverter, battery, and package has a bright green WhatsApp button. Clicking it pre-fills the exact product name, brand, model, and listed price, so buyers can inquire or order with one tap!
- **Floating WhatsApp Widget**: Persistent pulsing button across the entire site with quick greeting bubbles.
- **Sticky Mobile Bottom Bar**: Seamless mobile ordering with direct Call, WhatsApp, Catalog, Calculator, and Cart buttons.

### 2. 🧮 Interactive Solar System Estimator & Savings Calculator
- **Two Estimation Modes**:
  - **By Monthly Units / Bill**: Select monthly electricity consumption (150 to 2500+ units) to calculate required kW, panels count, inverter capacity, and monthly savings.
  - **By Appliance Load**: Counter for 1.5-ton ACs, 1.0-ton ACs, ceiling fans, refrigerators, water pumps, and lights.
- **Instant WhatsApp Breakdown**: One-click **"Send My Solar Calculation to WhatsApp"** button sends the exact calculation directly to the proprietor.

### 3. 📦 Complete Pre-Engineered Turnkey Solar Packages
- **3.2 kW Starter Hybrid System** (Home essential load)
- **5 kW Executive Hybrid System** (Runs 1 Inverter AC)
- **10 kW Zero-Bill Net Metering System** (Full household load)
- Itemized lists of panels, inverters, structures, earthing, cables, and DISCO net-metering support.

### 4. 📋 Live Daily Solar Rate Sheet
- Dedicated, printable daily price sheet view with today's date for panels, inverters, and batteries.
- Quick WhatsApp action for bulk/container dealer inquiries.

### 5. 🛠️ Built-in Admin Management Portal (No Coding Required!)
- **PIN Protected**: Default PIN is `1234` (can be changed anytime in settings).
- **Post New Products**:
  - Add product title, category, brand, selling price, original price, unit, and badge.
  - **Upload Local Photos directly from device/phone** or paste image URLs.
  - Dynamic **Technical Specifications builder** (add/remove custom key-value specs).
- **Instant Price Updates**: Update prices in 5 seconds when solar market rates fluctuate.
- **Store Settings Manager**: Update your father's **WhatsApp Number**, shop phone, address, top announcement banner, and currency symbol with immediate real-time sync.
- **Backup & Restore**: Download complete store data as a JSON file or restore from a backup.

---

## 💻 How to Run the Website Locally

### Start Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Production Bundle:
```bash
npm run build
```

### Preview Production Build:
```bash
npx vite preview --port 5173 --host
```
The preview is currently running and accessible at [http://localhost:5173](http://localhost:5173).

---

## 🌐 Deploying Online (Free & Fast)

### Option A: Vercel (Recommended, 1-Click)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework preset: **Vite**. Click **Deploy**!

### Option B: Netlify
1. Drag and drop the `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Your website goes live with free SSL immediately.

### Option C: Shared Hosting / cPanel (e.g., Namecheap, Hostinger)
1. Run `npm run build`.
2. Upload the files inside `E:\star\dist\` into your domain's `public_html/` folder.

---

## 🔐 Admin Portal Credentials
- **Access URL**: Click the **"Admin" / "Shield"** button in the top navigation or footer.
- **Default PIN**: `1234`
- **Change PIN**: Go to **Manager Portal > WhatsApp & Store Settings > Change Manager PIN**.
