# Setup & Troubleshooting Guide

## ✅ Fixes Applied

### 1. Fixed MongoDB Connection
**File**: `src/lib/mongodb.ts`
- Fixed connection caching logic with proper TypeScript types
- Added proper error handling
- Ensures connection is properly cached across requests

### 2. Component Files Status
**All component files exist and are correctly imported:**
- ✅ `src/components/NotesContainer.tsx` - Main container
- ✅ `src/components/NoteForm.tsx` - Form for create/edit
- ✅ `src/components/NoteList.tsx` - List with edit/delete buttons

## ⚠️ Important: MongoDB Setup Required

### The app requires a MongoDB instance to run. Choose one:

#### Option 1: Local MongoDB (Recommended for Development)
1. **Install MongoDB Community Edition**:
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - Or use MongoDB via Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

2. **Start MongoDB**:
   ```bash
   # Windows
   net start MongoDB
   
   # Or via Docker
   docker start mongodb
   ```

3. **Verify Connection**:
   ```bash
   mongosh  # or mongo (for older versions)
   # You should see the MongoDB shell prompt
   ```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/notes-app`)
4. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app?retryWrites=true&w=majority
   ```

## 🧪 Testing CRUD Operations

After MongoDB is running:

### 1. **CREATE** - Add a Note
- Title: "My First Note"
- Content: "This is my first note"
- Click "Create Note" button
- Verify note appears in the list

### 2. **READ** - View Notes
- Notes display automatically after creation
- Should see timestamp of creation
- Content is displayed in full

### 3. **UPDATE** - Edit a Note
- Click "Edit" button on any note
- Form populates with current content
- Modify title/content
- Click "Update Note"
- Verify changes appear in the list

### 4. **DELETE** - Remove a Note
- Click "Delete" button on any note
- Confirm deletion in alert dialog
- Note should disappear from list
- **If this doesn't work**: MongoDB is likely not running!

## 🔧 Current Environment

**Dev Server**: http://localhost:3000 ✅ Running
**Port**: 3000
**Database**: MongoDB (connection defined in `.env.local`)

## 📋 Verification Checklist

- [ ] MongoDB is running and accessible
- [ ] Dev server is running at http://localhost:3000
- [ ] Can create a note successfully
- [ ] Can view all notes in the list
- [ ] Can edit an existing note
- [ ] Can delete a note (THIS IS THE KEY TEST)
- [ ] Timestamps appear on notes

## 🐛 Debug Steps for Delete Not Working

1. **Open Browser DevTools** (F12)
2. **Go to Network tab**
3. **Click Delete** on a note
4. **Check the request**:
   - Should be `DELETE /api/notes/{note_id}`
   - Response should be 200 with `{ message: "Note deleted successfully" }`
5. **If error 500**: MongoDB is likely not connected
6. **Check Console tab** for error messages
7. **Check terminal output** where dev server is running for logs

## 🚀 How to Run

```bash
# Terminal 1: Start MongoDB
mongosh  # just verify it's running

# Terminal 2: Start Dev Server (should already be running)
cd "c:\Business\code play ground\Ramyoz Assignment"
npm run dev

# Open browser
http://localhost:3000
```

## 📁 Key Files to Know

- **MongoDB Connection**: `src/lib/mongodb.ts`
- **Delete API Route**: `src/app/api/notes/[id]/route.ts` (DELETE function)
- **Delete Handler**: `src/components/NoteList.tsx` (handleDelete function)
- **Delete Button**: `src/components/NoteList.tsx` (line ~70)

---

**Next Step**: Start/verify MongoDB is running, then test all CRUD operations.
