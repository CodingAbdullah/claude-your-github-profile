# 🚀 Claude Your GitHub Profile

A comprehensive GitHub profile showcase built with **Claude Code**, **Next.js 15+ App Router**, and the **GitHub API**. This project demonstrates rapid development using AI-assisted coding and modern web technologies.

## ✨ Features

### 📊 **Complete Profile Overview**
- **User Profile**: Avatar, bio, location, company, social links, and key statistics
- **Network Analysis**: Followers and following with avatar grids
- **Organizations**: All organization memberships with descriptions
- **Contribution Calendar**: GitHub-style heatmap showing daily contribution patterns
- **Recent Activity**: Real-time activity feed with event types and timestamps

### 📂 **Repository & Code Management**
- **Repositories**: Complete repo listing with language detection and percentages
- **Starred Repositories**: Curated starred repos with owner information
- **Gists**: Public gists with file counts and descriptions
- **Language Analytics**: Byte-based language percentage calculations

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **UI Components**: Responsive design with expand/collapse sections
- **API Integration**: GitHub REST API + GraphQL
- **Development**: Claude Code for rapid AI-assisted development
- **Deployment**: Vercel-ready configuration

## 🔧 GitHub API Endpoints Used

### REST API Endpoints
- `/users/{username}` - User profile information
- `/users/{username}/repos` - User repositories (100 per page)
- `/users/{username}/starred` - Starred repositories (100 per page)
- `/users/{username}/gists` - Public gists (100 per page)
- `/users/{username}/followers` - Followers list (50 per page)
- `/users/{username}/following` - Following list (50 per page)
- `/users/{username}/orgs` - Organization memberships
- `/users/{username}/events/public` - Public activity events (30 per page)
- `/repos/{owner}/{repo}/languages` - Repository language breakdown

### GraphQL API Endpoint
- **Contribution Calendar**: Advanced GraphQL query for contribution heatmap data
  ```graphql
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
              color
            }
          }
        }
      }
    }
  }
  ```

## 🔐 Authentication Setup

### Environment Variables
Create a `.env.local` file in the root directory:

```bash
GITHUB_AUTH_TOKEN=your_github_personal_access_token_here
```

### GitHub Token Requirements
- **Token Type**: Personal Access Token (classic or fine-grained)
- **Required Scopes**:
  - `public_repo` (for public repository access)
  - `read:user` (for user profile data)
  - `read:org` (for organization data)
- **GraphQL Access**: Token is **required** for contribution calendar data
- **Rate Limits**: 5,000 requests/hour (authenticated) vs 60 requests/hour (unauthenticated)

### Getting Your Token
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token with required scopes
3. Copy token to your `.env.local` file
4. Restart your development server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub Personal Access Token

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/claude-your-github-profile.git
cd claude-your-github-profile

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GITHUB_AUTH_TOKEN to .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` and enter any GitHub username to explore their profile!

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Interactive Elements**: Expand/collapse sections for better mobile experience
- **Custom Scrollbars**: Styled scrollbars matching the dark theme
- **Matrix-Style Theme**: Custom CSS variables with terminal aesthetics


## 📦 Project Structure

```
app/
├── components/          # React components
│   ├── ContributionCalendar.tsx
│   ├── ContributionGraph.tsx
│   ├── Followers.tsx
│   ├── GitHubProfile.tsx
│   ├── Organizations.tsx
│   ├── Profile.tsx
│   ├── Repositories.tsx
│   └── StarredRepos.tsx
├── api/github/          # API routes
│   └── users/[username]/
│       ├── contributions/
│       ├── events/
│       ├── followers/
│       ├── following/
│       ├── gists/
│       ├── orgs/
│       ├── repos/
│       └── starred/
├── utils/types/         # TypeScript interfaces
└── globals.css          # Global styles and CSS variables
```

## 🌐 Deployment

### Vercel Deployment
This project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Variables in Production
Add your `GITHUB_AUTH_TOKEN` to Vercel's environment variables in the dashboard.
 

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Claude Code and modern web technologies**