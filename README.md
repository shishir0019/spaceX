# SpaceX Web Application

This web application allows users to easily view and interact with SpaceX data directly from their browser.

### Features

- **Datatable**: Display data in both list and grid views.
- **Map**: Integrated OpenLayers map to show the landing pad locations using latitude and longitude coordinates.
- **Chart**: Visualize landing pad success rates using a doughnut chart.

### Installation Guide

Follow the steps below to set up the project locally.

1. **Clone the repository**:

   In your terminal, run the following commands to clone the repository and navigate into the project folder:

   ```bash
   git clone git@github.com:shishir0019/spaceX.git
   cd spaceX
   ```

2. **Install dependencies**:

   Install the required npm dependencies:

   ```bash
   npm install
   ```

3. **Start the development server**:

   Run the application in development mode by executing:

   ```bash
   npm run dev
   ```

   The development server should now be running, and you can access the app in your browser at `http://localhost:3000` (or the default port specified in your configuration).

4. **Build the application for production**:

   To build the application for production and optimize it for deployment, run:

   ```bash
   npm run build
   ```

   This will create a `dist` folder with the production-ready files.

---

You're now ready to explore SpaceX data with the web application! If you encounter any issues, feel free to open an issue or pull request on the repository.

