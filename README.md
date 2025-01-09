# Prima Admin Panel

Prima is a modern, feature-rich admin panel built with Next.js 13, TypeScript, and Tailwind CSS. It provides a comprehensive solution for managing invoices, customers, and business operations.

![Prima Admin Panel](https://github.com/mariussde/prima/raw/main/public/screenshot.png)

## Features

- 🎨 Modern and responsive UI using Tailwind CSS
- 🌙 Light/Dark mode support
- 📊 Invoice management system
- 👥 Customer relationship management
- 🔍 Advanced filtering and search capabilities
- 📱 Mobile-friendly design
- 🔒 Role-based access control (coming soon)
- 📈 Analytics dashboard (coming soon)

## Tech Stack

- **Framework:** Next.js 13 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Form Handling:** React Hook Form (coming soon)
- **Data Storage:** Local Storage (Supabase integration coming soon)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/prima-admin.git
   ```

2. Install dependencies:
   ```bash
   cd prima-admin
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
prima-admin/
├── app/                    # Next.js 13 app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── customers/         # Customer management
│   └── helpdesk/         # Help center
├── components/            # Reusable components
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── lib/                   # Utilities and helpers
│   ├── data/             # Data management
│   └── models/           # TypeScript types
└── public/               # Static assets
```

## Key Features

### Invoice Management
- Create, edit, and delete invoices
- Filter and search functionality
- Status tracking (Draft, Pending, Paid, Overdue)
- Item management with automatic calculations

### Customer Management
- Comprehensive customer database
- Detailed customer profiles
- Contact information management
- Activity history

### Help Center
- Searchable FAQ section
- Multiple support channels
- Documentation access
- Contact options

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@prima-admin.com or open an issue in the GitHub repository.

## Roadmap

- [ ] Authentication system
- [ ] Role-based access control
- [ ] Analytics dashboard
- [ ] Export functionality
- [ ] Email notifications
- [ ] Supabase integration
- [ ] API documentation
- [ ] Mobile app
