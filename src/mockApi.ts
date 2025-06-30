const mockApi = {
  getTasks: () => ({
    "To Do": [
      {
        id: 1,
        title: "Design homepage layout",
        status: "to-do",
        subtasks: [
          { id: 1, title: "Create wireframe", isCompleted: false },
          { id: 2, title: "Select color palette", isCompleted: false },
          { id: 3, title: "Get client feedback", isCompleted: false },
        ],
      },
      {
        id: 2,
        title: "Set up project repository",
        status: "to-do",
        subtasks: [
          { id: 4, title: "Initialize Git repo", isCompleted: true },
          { id: 5, title: "Add README", isCompleted: false },
          { id: 6, title: "Configure CI/CD", isCompleted: false },
        ],
      },
      {
        id: 3,
        title: "Plan API structure",
        status: "to-do",
        subtasks: [
          { id: 7, title: "Define endpoints", isCompleted: false },
          { id: 8, title: "Document API specs", isCompleted: false },
        ],
      },
      {
        id: 4,
        title: "Create user registration form",
        status: "to-do",
        subtasks: [
          { id: 9, title: "Design form UI", isCompleted: false },
          { id: 10, title: "Add input validation", isCompleted: false },
          { id: 11, title: "Test form submission", isCompleted: false },
        ],
      },
      {
        id: 5,
        title: "Set up authentication service",
        status: "to-do",
        subtasks: [
          { id: 12, title: "Choose auth provider", isCompleted: true },
          { id: 13, title: "Implement OAuth flow", isCompleted: false },
        ],
      },
      {
        id: 6,
        title: "Write unit tests for utils",
        status: "to-do",
        subtasks: [
          { id: 14, title: "Identify utility functions", isCompleted: false },
          { id: 15, title: "Write test cases", isCompleted: false },
          { id: 16, title: "Run test coverage", isCompleted: false },
        ],
      },
      {
        id: 7,
        title: "Design database schema",
        status: "to-do",
        subtasks: [
          { id: 17, title: "Define entities", isCompleted: false },
          { id: 18, title: "Create ER diagram", isCompleted: false },
        ],
      },
      {
        id: 8,
        title: "Set up monitoring tools",
        status: "to-do",
        subtasks: [
          { id: 19, title: "Choose monitoring service", isCompleted: false },
          { id: 20, title: "Configure alerts", isCompleted: false },
          { id: 21, title: "Test logging", isCompleted: false },
        ],
      },
      {
        id: 9,
        title: "Create API documentation",
        status: "to-do",
        subtasks: [
          { id: 22, title: "Set up Swagger", isCompleted: false },
          { id: 23, title: "Document endpoints", isCompleted: false },
        ],
      },
      {
        id: 10,
        title: "Plan user onboarding flow",
        status: "to-do",
        subtasks: [
          { id: 24, title: "Design welcome screen", isCompleted: false },
          { id: 25, title: "Write tutorial content", isCompleted: false },
          { id: 26, title: "Test onboarding", isCompleted: false },
        ],
      },
      {
        id: 11,
        title: "Optimize image assets",
        status: "to-do",
        subtasks: [
          { id: 27, title: "Compress images", isCompleted: false },
          { id: 28, title: "Implement lazy loading", isCompleted: false },
        ],
      },
      {
        id: 12,
        title: "Set up email notifications",
        status: "to-do",
        subtasks: [
          { id: 29, title: "Choose email provider", isCompleted: true },
          { id: 30, title: "Design email templates", isCompleted: false },
          { id: 31, title: "Test email delivery", isCompleted: false },
        ],
      },
      {
        id: 13,
        title: "Create dashboard UI",
        status: "to-do",
        subtasks: [
          { id: 32, title: "Design dashboard layout", isCompleted: false },
          { id: 33, title: "Add data visualizations", isCompleted: false },
        ],
      },
      {
        id: 14,
        title: "Review accessibility",
        status: "to-do",
        subtasks: [
          { id: 34, title: "Run accessibility audit", isCompleted: false },
          { id: 35, title: "Fix ARIA labels", isCompleted: false },
          { id: 36, title: "Test screen readers", isCompleted: false },
        ],
      },
      {
        id: 15,
        title: "Plan marketing campaign",
        status: "to-do",
        subtasks: [
          { id: 37, title: "Define target audience", isCompleted: false },
          { id: 38, title: "Create ad content", isCompleted: false },
          { id: 39, title: "Set up analytics", isCompleted: false },
        ],
      },
    ],
    Doing: [
      {
        id: 16,
        title: "Develop login feature",
        status: "doing",
        subtasks: [
          { id: 40, title: "Implement authentication", isCompleted: true },
          { id: 41, title: "Add password reset", isCompleted: false },
          { id: 42, title: "Test login flow", isCompleted: false },
        ],
      },
      {
        id: 17,
        title: "Optimize database queries",
        status: "doing",
        subtasks: [
          { id: 43, title: "Index key columns", isCompleted: true },
          { id: 44, title: "Refactor joins", isCompleted: false },
        ],
      },
      {
        id: 18,
        title: "Build user profile page",
        status: "doing",
        subtasks: [
          { id: 45, title: "Create UI components", isCompleted: true },
          { id: 46, title: "Connect to backend", isCompleted: false },
          { id: 47, title: "Add form validation", isCompleted: false },
        ],
      },
    ],
    Done: [
      {
        id: 19,
        title: "Database migration",
        status: "done",
        subtasks: [
          { id: 48, title: "Backup database", isCompleted: true },
          { id: 49, title: "Run migration script", isCompleted: true },
          { id: 50, title: "Verify data integrity", isCompleted: true },
        ],
      },
      {
        id: 20,
        title: "Set up CI pipeline",
        status: "done",
        subtasks: [
          { id: 51, title: "Configure GitHub Actions", isCompleted: true },
          { id: 52, title: "Add unit tests", isCompleted: true },
        ],
      },
      {
        id: 21,
        title: "Deploy initial version",
        status: "done",
        subtasks: [
          { id: 53, title: "Set up server", isCompleted: true },
          { id: 54, title: "Push to production", isCompleted: true },
          { id: 55, title: "Monitor logs", isCompleted: true },
        ],
      },
    ],
  }),
};

export default mockApi;
