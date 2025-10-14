# Mumbai Mitr - Setup & Usage Guide

## 🚀 Overview
Mumbai Mitr is a complete AI-powered tour guide for Mumbai with authentication, premium features, and a modern responsive design.

## 🎨 Features
- **Modern Design**: Ocean blue & coral color scheme with responsive layout
- **User Authentication**: Email/password signup and login using Supabase
- **Premium Membership System**: Role-based access control with premium features
- **AI Chat Guide**: Powered by Lovable AI (Gemini models)
- **Interactive Map**: 23+ Mumbai POIs with Leaflet integration
- **Smart Itinerary Builder**: Free 1-day plans, premium multi-day itineraries
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile

## 📦 Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Backend**: Lovable Cloud (Supabase) - automatically managed
- **Database**: PostgreSQL with Row Level Security
- **AI**: Lovable AI Gateway (Google Gemini models)
- **Map**: Leaflet.js with OpenStreetMap tiles

## 🏗️ Database Structure

### Tables Created:
1. **profiles** - User profile information
   - Linked to auth.users
   - Stores email, full_name, avatar_url

2. **user_roles** - Role management (separate for security)
   - Roles: 'user', 'premium', 'admin'
   - Uses security definer function to prevent RLS recursion

3. **pois** - Points of Interest (23 Mumbai locations)
   - Includes Gateway of India, Marine Drive, Colaba, etc.

4. **itineraries** - User-created travel plans

## 🔑 Authentication Flow

### User Registration:
1. User signs up at `/auth` with email + password + full name
2. Trigger automatically creates profile and assigns 'user' role
3. Email confirmation is disabled for easy testing
4. User redirected to homepage after signup

### Session Management:
- Sessions stored in localStorage
- Auto-refresh tokens enabled
- Auth state synced across app with useAuth hook

## 💎 Premium System

### How It Works:
- **Free Users**: Can create 1-day itineraries, basic POI info
- **Premium Users**: Multi-day itineraries, hidden gems, resort recommendations

### Grant Premium Access:
Users can upgrade at `/premium` page. Currently simulated (no real payment).

**To manually grant premium to a user:**
```sql
-- Run in Lovable Cloud SQL Editor
INSERT INTO user_roles (user_id, role)
VALUES ('user-uuid-here', 'premium');
```

### TODO: Real Payment Integration
Located in `src/pages/Premium.tsx` at line 27-60:

**For Razorpay (India):**
```typescript
const options = {
  key: 'YOUR_RAZORPAY_KEY',
  amount: 49900, // ₹499 in paise
  currency: 'INR',
  name: 'Mumbai Mitr Premium',
  handler: async (response) => {
    // Verify payment on backend
    // Grant premium role
  }
};
```

**For Stripe (International):**
- Create checkout session on backend
- Redirect to Stripe hosted checkout
- Handle webhook for successful payment
- Grant premium role after verification

## 🎨 Design Customization

### Color Scheme (src/index.css):
```css
/* Primary colors */
--primary: 205 87% 45%;      /* Ocean Blue */
--secondary: 14 85% 65%;     /* Coral Accent */
--premium-gold: 43 96% 56%;  /* Premium Badge */
```

### Change Colors:
Edit `src/index.css` lines 11-75 (light mode) and 77-128 (dark mode)

### Modify Gradients:
```css
--gradient-ocean: linear-gradient(...);
--gradient-sunset: linear-gradient(...);
--premium-gradient: linear-gradient(...);
```

## 🤖 AI Customization

### Edit AI Personality:
File: `supabase/functions/mumbai-chat/index.ts`
Line: 21

```typescript
const systemPrompt = `You are Mumbai Mitr, a warm and lovable AI tour guide...`;
```

Change this prompt to modify how the AI responds!

### AI Models Available:
- `google/gemini-2.5-flash` (default, free during Sept 29 - Oct 6, 2025)
- `google/gemini-2.5-pro` (more powerful)
- `google/gemini-2.5-flash-lite` (faster, cheaper)

Change model in edge function if needed.

## 📍 POI Data Management

### Add/Edit POIs:
1. **Via Admin Panel**: Navigate to `/admin` page
2. **Via Database**: 
   ```sql
   INSERT INTO pois (name, description, latitude, longitude, area, tags)
   VALUES ('New Place', 'Description', 19.0760, 72.8777, 'South Mumbai', ARRAY['food', 'heritage']);
   ```

### POI Structure:
- name: Display name
- description: Short description
- latitude/longitude: Map coordinates
- area: Geographic area (e.g., "Colaba", "Bandra")
- tags: Array of categories (heritage, food, beach, etc.)
- image_url: Optional image link

## 🗺️ Map Customization

### Change Map Center/Zoom:
File: `src/components/MapView.tsx`
Lines: 33, 44-48

```typescript
// Default Mumbai center
center: [19.0760, 72.8777]
zoom: 12

// Alternative tile layers (Google Maps)
// See comments in MapView.tsx for details
```

## 🔒 Security Features

### Implemented:
- Row Level Security (RLS) on all tables
- Separate user_roles table (prevents privilege escalation)
- Security definer functions (prevents RLS recursion)
- Email validation with zod schemas
- Auto-confirm emails enabled for testing

### Testing Auth:
1. Go to `/auth`
2. Create test account: test@example.com / password123
3. Sign in and explore features
4. Manually grant premium (see SQL above) to test premium features

## 📱 Responsive Design

### Breakpoints:
- Mobile: < 768px (simplified nav with icons)
- Tablet: 768px - 1024px
- Desktop: > 1024px (full nav with labels)

### Mobile Navigation:
- Icon-only buttons for space efficiency
- Dropdown menu for user profile
- All features accessible

## 🚧 Known Limitations

### Current Implementation:
- No real payment processing (simulated premium upgrade)
- No email verification required (auto-confirm enabled)
- Basic error handling (can be enhanced)
- No password reset flow (can be added)

### Future Enhancements:
1. Add real payment gateway (Razorpay/Stripe)
2. Email verification with OTP
3. Password reset functionality
4. User profile editing
5. Save/share itineraries
6. User reviews for POIs
7. Booking integration for hotels/tours

## 🧪 Testing Guide

### Test User Journey:
1. **Homepage**: Browse features, see CTA for signup
2. **Sign Up**: Create account at `/auth`
3. **Explore**: Check POIs at `/explore`
4. **Map**: View interactive map at `/map`
5. **Chat**: Talk to AI at `/chat`
6. **Itinerary**: Try 1-day plan (free) at `/itinerary`
7. **Premium Page**: View premium features at `/premium`
8. **Upgrade**: Simulate premium purchase
9. **Test Premium**: Try multi-day itinerary (now unlocked)

### Test Scenarios:
- [ ] User can sign up successfully
- [ ] User can sign in after signup
- [ ] Free user sees 1-day itinerary limit
- [ ] Premium user can create 3-day itinerary
- [ ] Map shows all 23 POIs correctly
- [ ] Chat responds with AI messages
- [ ] Navigation works on mobile
- [ ] Premium badge shows after upgrade

## 🔧 Development

### Run Locally:
```bash
npm install
npm run dev
```

### Access App:
- Frontend: Auto-opens in browser
- Preview URL: Provided by Lovable

### Backend:
- Lovable Cloud handles all backend automatically
- Edge functions auto-deploy with code changes
- Database migrations run automatically

## 📞 Support & Troubleshooting

### Common Issues:

**"User not logged in" errors:**
- Check if user session is valid
- Try logging out and back in
- Clear localStorage if needed

**Premium features not working:**
- Verify user_roles table has premium entry
- Check console for errors
- Ensure isPremium hook is working

**Map not loading:**
- Check internet connection
- Verify Leaflet CSS is loaded
- Check browser console for errors

**AI chat not responding:**
- Check edge function logs in Lovable Cloud
- Verify LOVABLE_API_KEY is set
- Check for rate limit errors (429)

## 📝 Notes

### Environment Variables:
All managed automatically by Lovable Cloud:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- LOVABLE_API_KEY (backend only)

### Database Access:
View/edit data in Lovable Cloud dashboard (Users tab)

### Logs:
Check edge function logs in Lovable Cloud for debugging

## 🎉 That's It!

You now have a complete AI tour guide with authentication, premium features, and beautiful design. Customize as needed and enjoy building your Mumbai travel app!

**Questions?** Check the code comments or Lovable documentation.
