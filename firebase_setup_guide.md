# Firebase Console Setup Guide & Security Rules

This guide outlines how to configure a live Google Firebase project for **Sri Sai Lakshmi Ghee Sweets** and connect it to your application.

---

## Step 1: Create a Firebase Project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**).
3. Name your project (e.g., `sri-sai-lakshmi-sweets`).
4. Choose whether to enable Google Analytics (optional, recommended for production tracking) and click **Create project**.
5. Once your project is ready, click **Continue**.

---

## Step 2: Add a Web App & Copy Credentials

1. On the project homepage, click the **Web icon** (`</>`) to add a web application.
2. Register the app with a nickname (e.g., `Sri Sai Lakshmi Web`).
3. (Optional) Check the box for Firebase Hosting if you want to deploy later.
4. Click **Register app**.
5. Under **Firebase SDK snippet**, copy the properties inside the `firebaseConfig` object:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
6. Open your local project directory and paste these values into the file [.env.local](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/sri-sai-lakshmi/.env.local), replacing the placeholder values:
   ```env
   VITE_FIREBASE_API_KEY=your_copied_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_copied_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_copied_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_copied_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_copied_sender_id
   VITE_FIREBASE_APP_ID=your_copied_app_id
   ```
7. Restart your development server (`npm run dev`) for the new environment variables to load.

---

## Step 3: Enable Firebase Authentication

1. In the Firebase left sidebar, click **Build** -> **Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, click **Email/Password**.
4. Enable **Email/Password** (keep Email link disabled) and click **Save**.
5. Go to the **Users** tab and click **Add user**.
6. Create an administrator account:
   - **Email**: `admin@srisailakshmi.com` (or any email of your choice)
   - **Password**: Create a secure password (make sure to remember it!)
7. You will use this email and password to log in to the admin/owner dashboard.

---

## Step 4: Enable Cloud Firestore Database

1. In the left sidebar, click **Build** -> **Firestore Database**.
2. Click **Create database**.
3. Choose your database location (select the location closest to your users, e.g., `asia-south1` for India).
4. Start in **Production mode** or **Test mode**.
5. Go to the **Rules** tab, paste the following rules, and click **Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Public collections for clients to read, only admin can write
    match /products/{document} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    match /gallery/{document} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    match /chatbot_faqs/{document} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    // inquiries: Clients can submit (create), only admin can read, update, or delete
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if isAuthenticated();
    }
  }
}
```

---

## Step 5: Enable Cloud Storage for Images

1. In the left sidebar, click **Build** -> **Storage**.
2. Click **Get Started**.
3. Start in **Production mode** (or click Next).
4. Choose the storage bucket location (use the default matched to your database location) and click **Done**.
5. Once initialized, go to the **Rules** tab, paste the following rules, and click **Publish**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Anyone can read images, only authenticated admins can write/delete
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

---

## Step 6: Seed Your Live Database

1. Log in to the Admin Dashboard at `/admin` using the admin credentials you created in Step 3.
2. If your database is empty, a banner will appear at the top of the **Dashboard Summary** page prompting you to seed the database.
3. Click the **Seed Database** button.
4. This will automatically write the initial set of Sweets, Hot Items, Gallery photos, and FAQ entries to your live database.
