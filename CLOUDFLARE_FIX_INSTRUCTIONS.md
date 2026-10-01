# Cloudflare Pages Fix Instructions
**Date**: January 2025  
**Issues Found**: Wrong repository + Invalid build command

---

## 🔴 **TWO CRITICAL ISSUES**

### Issue 1: Wrong Repository
- **Current**: `ShayneIsMagic/SFC.io` ❌
- **Should be**: `Dev-Pipeline-145/SFC.io` ✅
- **Evidence**: Logs show old commit `b0c320f` instead of latest `da23383`

### Issue 2: Invalid Build Command
- **Current**: Build command = `/` ❌
- **Should be**: (empty/blank) ✅
- **Error**: `/bin/sh: 1: /: Permission denied`

---

## ✅ **STEP-BY-STEP FIX**

### Step 1: Go to Cloudflare Pages Settings
1. Navigate to: https://dash.cloudflare.com/1ae6f199e2c03bf8339cd6a36fbdd2c6/pages/view/sfc-io
2. Click **"Settings"** tab (top navigation)
3. Scroll to **"Builds & deployments"** section

### Step 2: Fix Repository Connection
1. Find **"Connected repository"** section
2. Click **"Disconnect"** or **"Change repository"** button
3. Click **"Connect to Git"**
4. Select **GitHub**
5. **IMPORTANT**: Search for and select:
   - ✅ `Dev-Pipeline-145/SFC.io` (CORRECT)
   - ❌ NOT `ShayneIsMagic/SFC.io` (WRONG)
6. Authorize Cloudflare to access the repository
7. Select branch: **`main`**

### Step 3: Fix Build Settings
1. In **"Builds & deployments"** section, find:
   - **Build command**: 
     - ❌ Currently: `/` (WRONG - causes error)
     - ✅ Change to: (leave completely empty/blank)
   - **Build output directory**: `/` (keep as is)
   - **Root directory**: `/` (keep as is)

2. **Clear the build command field**:
   - Delete the `/` character
   - Leave the field completely empty
   - This is correct for static HTML sites

### Step 4: Save and Deploy
1. Click **"Save"** button
2. Cloudflare will automatically trigger a new deployment
3. Go to **"Deployments"** tab to watch the build

### Step 5: Verify Deployment
After deployment completes, check:

1. **Deployment Logs Should Show**:
   ```
   From https://github.com/Dev-Pipeline-145/SFC.io ✅
   HEAD is now at da23383 Merge fix/critical-issues... ✅
   ```

2. **NOT**:
   ```
   From https://github.com/ShayneIsMagic/SFC.io ❌
   HEAD is now at b0c320f... ❌
   ```

3. **Build Should Succeed**:
   - ✅ No "Permission denied" errors
   - ✅ No build command errors
   - ✅ Deployment status: Success

---

## 📋 **CORRECT CONFIGURATION**

After fixing, your settings should be:

| Setting | Value |
|---------|-------|
| **Repository** | `Dev-Pipeline-145/SFC.io` ✅ |
| **Branch** | `main` |
| **Build command** | (empty/blank) ✅ |
| **Build output directory** | `/` |
| **Root directory** | `/` |
| **Framework preset** | None (or Static) |

---

## 🧪 **TEST AFTER FIX**

1. **Check Latest Deployment**:
   - Should show commit: `da23383`
   - Should show message: "Merge fix/critical-issues: Prioritize California, add Missouri & Kansas"

2. **Visit Live Site**:
   - Go to: https://salesforceconsultants.io
   - Verify homepage shows: "Serving California, Missouri, Kansas & Utah"
   - Verify service areas show California first

3. **Check Deployment Logs**:
   - Should show: `From https://github.com/Dev-Pipeline-145/SFC.io`
   - Should NOT show build command errors
   - Should complete successfully

---

## ⚠️ **IF STILL NOT WORKING**

If deployment still fails after fixing both issues:

1. **Check GitHub Permissions**:
   - Cloudflare needs read access to `Dev-Pipeline-145/SFC.io`
   - Verify in GitHub: Settings → Applications → Authorized OAuth Apps

2. **Manual Deployment**:
   - Go to Deployments tab
   - Click "Create deployment"
   - Select branch: `main`
   - Click "Deploy"

3. **Check for Webhook Issues**:
   - GitHub webhook may need to be recreated
   - Cloudflare should auto-create webhook when connecting repository

---

**Last Updated**: January 2025  
**Repository**: `Dev-Pipeline-145/SFC.io`  
**Latest Commit**: `da23383`



