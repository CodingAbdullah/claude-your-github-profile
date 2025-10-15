# GitHub Profile Terminal

## Overview

A terminal-style GitHub profile viewer built with Next.js 15+ App Router that provides comprehensive visualization of GitHub user data. The application fetches and displays user profiles, repositories, contributions, social networks, and activity through the GitHub REST and GraphQL APIs. Built with AI-assisted development (Claude Code), it demonstrates rapid modern web application development with TypeScript and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering Strategy**
- Next.js 15+ App Router with React Server Components and Client Components
- Client-side rendering for interactive components (marked with 'use client')
- Server-side API routes for GitHub data fetching
- TypeScript for type safety across the entire codebase

**UI & Styling Approach**
- Tailwind CSS with custom CSS variables for theming
- Shadcn UI component library (New York style variant) for consistent UI elements
- Courier New monospace font enforced globally for terminal aesthetic
- Responsive design with mobile-first breakpoints (sm, md, lg)
- Custom scrollbars and terminal-style borders for visual consistency

**Component Architecture**
- Modular component structure with isolated concerns:
  - Profile display components (Profile, Organizations, Followers)
  - Repository components (Repositories, StarredRepos, Gists)
  - Activity visualization (ContributionGraph, ContributionCalendar)
- Expand/collapse functionality in all major sections for better UX
- Form validation using React Hook Form + Zod for username input

**State Management**
- React useState hooks for local component state
- useEffect for data fetching lifecycle
- No global state management (Redux/Zustand) - state kept local to components
- Form state managed by react-hook-form

### Backend Architecture

**API Route Structure**
- Next.js API routes following RESTful patterns under `/app/api/github/`
- Nested route structure mirrors GitHub API endpoints:
  - `/users/[username]` - User profile data
  - `/users/[username]/repos` - Repository listings
  - `/users/[username]/starred` - Starred repositories
  - `/users/[username]/gists` - Public gists
  - `/users/[username]/followers` - Follower list
  - `/users/[username]/following` - Following list
  - `/users/[username]/orgs` - Organization memberships
  - `/users/[username]/events` - Public activity events
  - `/users/[username]/contributions` - GraphQL contribution calendar
  - `/repos/[owner]/[repo]/languages` - Repository language breakdown

**Data Fetching Strategy**
- Server-side fetch with Next.js revalidation (ISR-like behavior)
- Revalidation periods vary by data type:
  - User profile: 5 minutes (300s)
  - Repositories/Events: 5 minutes (300s)
  - Followers/Following: 10 minutes (600s)
  - Organizations: 1 hour (3600s)
  - Languages: 1 hour (3600s)

**Error Handling**
- Consistent error responses with appropriate HTTP status codes
- 404 handling for non-existent users/repos
- 500 handling for API failures
- Try-catch blocks around all external API calls
- User-friendly error pages (error.tsx, not-found.tsx)

### External Dependencies

**GitHub API Integration**
- **REST API**: Primary data source for user info, repos, gists, followers, events
  - Unauthenticated requests (60 requests/hour rate limit)
  - Custom User-Agent header for identification
  - Accept header for API version (vnd.github.v3+json)

- **GraphQL API**: Used exclusively for contribution calendar data
  - Requires authentication token (GITHUB_AUTH_TOKEN environment variable)
  - Queries 1 year of contribution history
  - Endpoint: https://api.github.com/graphql

**Language Analysis**
- Repository languages fetched via `/repos/{owner}/{repo}/languages` endpoint
- Byte-based percentage calculations performed client-side
- Language data cached for 1 hour

**Third-Party Services**
- Vercel Analytics for usage tracking
- Next.js Image optimization for GitHub avatars
- Remote image patterns configured for:
  - github.com
  - avatars.githubusercontent.com

**Development Tools**
- TypeScript for type checking
- ESLint for code quality (Next.js config)
- PostCSS + Autoprefixer for CSS processing
- Tailwind CSS for utility-first styling

**Environment Configuration**
- Optional GITHUB_AUTH_TOKEN for GraphQL contribution calendar access
- Contribution calendar gracefully degrades without token
- Port configured for 5000 (custom dev/start scripts)
- Host bound to 0.0.0.0 for external access

**Type System**
- Custom TypeScript interfaces for all GitHub data types:
  - GitHubUser, GitHubRepo, GitHubGist, GitHubFollower
  - GitHubOrganization, GitHubEvent
  - ContributionCalendar (GraphQL response structure)
- Path aliases configured (@/ for root directory imports)