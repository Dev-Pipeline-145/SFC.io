# Cloudflare Pages Deployment Setup
**Issue**: Cloudflare Pages not updating after git push

---

## 🔴 **CRITICAL ISSUES IDENTIFIED**

### Issue 1: Wrong Repository ❌
**Current**: Cloudflare is cloning from `https://github.com/ShayneIsMagic/SFC.io`  
**Should be**: `https://github.com/Dev-Pipeline-145/SFC.io`

**Evidence from logs**:
```
From https://github.com/ShayneIsMagic/SFC.io
HEAD is now at b0c320f Merges dev into main
```
This is an **old commit** - latest should be `da23383`

### Issue 2: Invalid Build Command ❌
**Current**: Build command is set to `/`  
**Error**: `/bin/sh: 1: /: Permission denied`  
**Should be**: (empty) for static HTML site

---

## 🔍 TROUBLESHOOTING CHECKLIST

### 1. Verify GitHub Connection ⚠️ **CRITICAL**
- [ ] Cloudflare Pages is connected to: `https://github.com/Dev-Pipeline-145/SFC.io` ✅ **CORRECT REPO**
- [ ] **NOT connected to**: `https://github.com/ShayneIsMagic/SFC.io` ❌ **WRONG REPO**
- [ ] Connected branch is: `main`
- [ ] GitHub integration has proper permissions

**⚠️ ISSUE IDENTIFIED**: Cloudflare Pages is connected to wrong repository!
- **Current local repo**: `Dev-Pipeline-145/SFC.io` ✅
- **Cloudflare is watching**: `ShayneIsMagic/SFC.io` ❌
- **Fix**: Reconnect Cloudflare Pages to `Dev-Pipeline-145/SFC.io`

### 2. Check Build Settings ⚠️ **CRITICAL**
Since this is a **static HTML site** (no build process needed):

**Build Settings Should Be:**
- **Build command**: (leave **completely empty**) ❌ **NOT** `/`
- **Build output directory**: `/` (root directory)
- **Root directory**: `/` (root directory)
- **Node.js version**: Not needed (can leave default)

**Current Error**: Build command is set to `/` which causes:
```
/bin/sh: 1: /: Permission denied
Failed: build command exited with code: 1
```

**Fix**: Clear the build command field completely (leave it blank)

### 3. Check Deployment Status
In Cloudflare Dashboard:
- Go to: Pages → `sfc-io` → Deployments
- Check latest deployment status:
  - ✅ Success (green)
  - ⚠️ Building (yellow)
  - ❌ Failed (red) - Check logs

### 4. Common Issues

#### Issue A: Wrong Branch
**Symptom**: Deployments not triggering
**Fix**: 
1. Go to Pages → `sfc-io` → Settings → Builds & deployments
2. Verify "Production branch" is set to `main`
3. Save changes

#### Issue B: Build Command Required
**Symptom**: Build fails or doesn't start
**Fix**:
1. Go to Pages → `sfc-io` → Settings → Builds & deployments
2. Set "Build command" to: (empty) or `echo "Static site"`
3. Set "Build output directory" to: `/`
4. Save and trigger new deployment

#### Issue C: Output Directory Wrong
**Symptom**: Site shows 404 or old content
**Fix**:
1. Go to Pages → `sfc-io` → Settings → Builds & deployments
2. Set "Build output directory" to: `/` (root)
3. Save and redeploy

#### Issue D: Deployment Not Triggered
**Symptom**: No new deployment after git push
**Fix**:
1. Check GitHub webhook is active
2. Manually trigger deployment:
   - Go to Pages → `sfc-io` → Deployments
   - Click "Retry deployment" on latest commit
   - OR click "Create deployment" → Select branch `main`

---

## 🚀 MANUAL DEPLOYMENT TRIGGER

If automatic deployment isn't working:

1. **Via Cloudflare Dashboard**:
   - Go to: Pages → `sfc-io` → Deployments
   - Click "Create deployment"
   - Select branch: `main`
   - Click "Deploy"

2. **Via Cloudflare API** (if needed):
   ```bash
   curl -X POST "https://api.cloudflare.com/client/v4/pages/projects/sfc-io/deployments" \
     -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"branch":"main"}'
   ```

---

## ✅ CORRECT CONFIGURATION FOR STATIC SITE

**Project Name**: `sfc-io`  
**Repository**: `Dev-Pipeline-145/SFC.io` ✅ **MUST BE THIS REPO**  
**⚠️ NOT**: `ShayneIsMagic/SFC.io` ❌ **WRONG REPO**  
**Production Branch**: `main`  
**Build Command**: (empty)  
**Build Output Directory**: `/`  
**Root Directory**: `/`  
**Environment Variables**: None needed

---

## 🔴 CRITICAL FIX: Wrong Repository Connection

### Problem
Cloudflare Pages is likely connected to:
- ❌ `https://github.com/ShayneIsMagic/SFC.io` (wrong repository)

But should be connected to:
- ✅ `https://github.com/Dev-Pipeline-145/SFC.io` (correct repository)

### Solution: Reconnect to Correct Repository

1. **Go to Cloudflare Dashboard**:
   - Navigate to: Pages → `sfc-io` → Settings → Builds & deployments

2. **Disconnect Current Repository**:
   - Scroll to "Connected repository"
   - Click "Disconnect" or "Change repository"

3. **Connect to Correct Repository**:
   - Click "Connect to Git"
   - Select GitHub
   - Search for: `Dev-Pipeline-145/SFC.io`
   - Select the repository
   - Authorize Cloudflare to access the repository

4. **Configure Build Settings**:
   - Production branch: `main`
   - Build command: (leave empty)
   - Build output directory: `/`
   - Root directory: `/`

5. **Save and Deploy**:
   - Click "Save"
   - Cloudflare will automatically trigger a deployment
   - Wait for deployment to complete

### Verification
After reconnecting:
- Check deployment shows commit: `da23383`
- Verify deployment is from `Dev-Pipeline-145/SFC.io`
- Check that new changes appear on live site

---

## 📋 VERIFICATION STEPS

After fixing configuration:

1. **Trigger Manual Deployment**:
   - Go to Cloudflare Dashboard → Pages → `sfc-io`
   - Click "Create deployment" → Select `main` branch
   - Wait for deployment to complete

2. **Verify Deployment**:
   - Check deployment logs for errors
   - Visit `https://salesforceconsultants.io`
   - Verify new content appears (California, Missouri, Kansas priority)

3. **Check Files**:
   - Verify `_redirects` file is present
   - Verify `_headers` file is present
   - Verify `index.html` has new location priority

---

## 🔧 QUICK FIX COMMANDS

If you have Cloudflare CLI (`wrangler`) installed:

```bash
# Install Wrangler (if not installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy manually
wrangler pages deploy . --project-name=sfc-io
```

---

## 📞 NEXT STEPS

1. Check Cloudflare Dashboard for deployment status
2. Verify build settings match above configuration
3. Trigger manual deployment if needed
4. Check deployment logs for any errors

---

**Last Updated**: January 2025  
**Repository**: `Dev-Pipeline-145/SFC.io`  
**Branch**: `main`



