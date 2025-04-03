# Contributing to Itachi-Uchiha

Thank you for considering contributing to **Itachi-Uchiha**! We appreciate your time and effort in improving the project. Follow the guidelines below to ensure a smooth contribution process.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository  
Since this is a private repository, you do **not** need to fork it. Instead, directly clone the repository to your local machine.  
```sh
git clone https://github.com/Manasvi27M/itachi-uchiha.git
```
Navigate into the project directory:  
```sh
cd itachi-uchiha
```
Fetch the latest changes from the repository:  
```sh
git pull origin develop
```

---

## 🛠️ Git Workflow  

### 2️⃣ Switch to `develop` Branch  
Always work on the `develop` branch. Sync it with the latest changes before making new updates.  
```sh
git checkout develop
git pull origin develop
```

### 3️⃣ Create a New Branch  
Before making any changes, create a new branch from `develop`. Choose a name relevant to the feature or issue you're working on.  
```sh
git checkout -b feature-branch-name
```

Example branch names:  
✅ `fix-header-bug`  
✅ `add-dark-mode`  

---

## 🏗️ Making Contributions  

### 4️⃣ Work on the Issue/Feature  
- Complete your task by modifying, adding, or deleting files as necessary.  
- Make sure your code follows best practices and is well-documented.  
- Test your changes before committing.  

### 5️⃣ Add Your Changes  
- If you want to add all modified files:  
  ```sh
  git add .
  ```
- If you want to add specific files:  
  ```sh
  git add filename1 filename2
  ```

### 6️⃣ Commit Your Changes  
Write a **clear and descriptive commit message** following the [Conventional Commits](https://www.conventionalcommits.org/) format:  
```sh
git commit -m "fix: resolve navbar responsiveness issue"
```
Example commit messages:  
✅ `feat: add a new login page UI`  
✅ `fix: correct styling for mobile view`  

---

## 🔼 Pushing Changes  

### 7️⃣ Push Your Work to GitHub  
Upload your local branch to the repository:  
```sh
git push -u origin feature-branch-name
```

---

## 🔁 Creating a Pull Request (PR)  

### 8️⃣ Open a PR to `develop` Branch  
1. Go to the **repository** on GitHub.  
2. Click the **"Compare & pull request"** button.  
3. Ensure the PR is merging **into the `develop` branch** _(not `main`!)_.  
4. Provide a **meaningful title** and **detailed description**.  
5. Mention the issue number this PR solves _(e.g., "Closes #12")_.  
6. Click **"Create Pull Request"**.
7. Wait for some one to review the changes and suggest changes.
8. Work on the suggested changes by making commits to the **same branch** (No new PR is required when you do this).
9. Wait for the PR to get reviewed and merged into the main branch.
    
Example PR title:  
✅ `feat: add animations to homepage (#45)`  

---

## ✅ Final Checks Before Submission  

- [ ] Does your code follow the project's coding style?  
- [ ] Have you tested your changes?  
- [ ] Did you link the issue number in your PR description?  
- [ ] Are you merging into `develop` and **not** `main`?  

Once your PR is submitted, the maintainers will review it and provide feedback if necessary. 🚀  

Thank you for contributing! ❤️
