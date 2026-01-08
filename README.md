<<<<<<< HEAD
# Notes Application

A full-stack web application built with Next.js, MongoDB, and Tailwind CSS that allows users to create, read, update, and delete notes.

## Features

- ✅ **Create Notes**: Add new notes with a title and content
- ✅ **View Notes**: Display all notes in a responsive grid layout
- ✅ **Edit Notes**: Update existing notes with new information
- ✅ **Delete Notes**: Remove notes with confirmation
- ✅ **Timestamps**: Automatic creation timestamps for each note
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Tools**: ESLint

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.ts           # GET all notes, POST create note
│   │       └── [id]/route.ts      # GET, PUT, DELETE specific note
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── NotesContainer.tsx         # Main container component
│   ├── NoteForm.tsx               # Form for creating/editing notes
│   └── NoteList.tsx               # List of notes with actions
├── lib/
│   └── mongodb.ts                 # MongoDB connection utility
└── models/
    └── Note.ts                    # Mongoose Note schema
```

## Prerequisites

- Node.js 18+ or later
- npm or yarn package manager
- MongoDB instance running locally or a connection string for MongoDB Atlas

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure MongoDB**:
   - Edit `.env.local` and update `MONGODB_URI` with your MongoDB connection string
   - Default is set to local MongoDB: `mongodb://localhost:27017/notes-app`

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a specific note
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

## Database Schema

### Note Collection
```typescript
{
  _id: ObjectId,
  title: string (required, max 100 chars),
  content: string (required),
  createdAt: Date (auto),
  updatedAt: Date (auto),
  timestamps: true
}
```

## Usage

### Creating a Note
1. Fill in the "Create Note" form on the left sidebar
2. Enter a title and content
3. Click "Create Note"

### Editing a Note
1. Click the "Edit" button on any note
2. The form will populate with the note's content
3. Make your changes
4. Click "Update Note"
5. Click "Cancel" to cancel editing

### Deleting a Note
1. Click the "Delete" button on any note
2. Confirm the deletion when prompted

## Configuration Files

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **.eslintrc.json** - ESLint configuration
- **.env.local** - Environment variables (not in version control)

## Development Notes

- The app uses Next.js App Router with the `/src` directory structure
- MongoDB connection is cached to avoid reconnecting on every request
- Form validation happens both on the client and server side
- All timestamps are automatically managed by MongoDB and Mongoose

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on your local machine or update `MONGODB_URI` in `.env.local`
- For MongoDB Atlas, use the full connection string: `mongodb+srv://username:password@cluster.mongodb.net/notes-app?retryWrites=true&w=majority`

### Port Already in Use
- Default port is 3000. To use a different port: `npm run dev -- -p 3001`

### Build Errors
- Clear the `.next` folder: `rm -rf .next` (or `rmdir /s .next` on Windows)
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

## License

This project is open source and available for educational purposes.
=======
# Ramyoz-project
>>>>>>> d8555093b6eeda25c31a5a06859023a3cdc57bc0
