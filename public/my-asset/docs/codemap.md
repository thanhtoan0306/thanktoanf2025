To find your GitHub link or contact information within a project, your brain operates like a **System Debugger**. It transitions from high-level observation to low-level structural analysis, using **Pattern Matching** to bypass the "noise" of thousands of lines of code.

Here is the exact cognitive process your brain uses to isolate the correct files:

---

### 1. The "String Search" (Pattern Recognition)
The most direct way your brain identifies the target is by searching for a unique "String" or "Literal."
* **The Logic:** If you see `github.com/yourname` on the website, your brain tells you that exact text must exist somewhere in the code.
* **Action:** You perform a **Global Search** (`Ctrl + Shift + F`) for your GitHub username or the word "github."
* **Result:** This usually leads you to a **Configuration File** or a **Footer Component**.

### 2. The Structural Perspective (Symmetry)
If the search returns too many results (or none because the link is dynamic), your brain switches to **Structural Perspective**. It asks: "Where is 'Metadata' or 'Identity' usually stored in this system architecture?"
* **The Path of Constants:** The brain looks for folders named `config/`, `constants/`, or `data/`. 
* **Action:** You look for files like `siteConfig.js`, `metadata.json`, or `constants.ts`.
* **Result:** You find a centralized object where the GitHub URL is defined once and reused everywhere.



### 3. The Component Hierarchy (Visual Mapping)
If the GitHub link is in a specific place (like the bottom of the page), your brain maps the **Visual UI** to a **File Tree**.
* **The Logic:** "The GitHub icon is in the Footer. Therefore, I need to find the `Footer` component."
* **Action:** You navigate to `src/components/layout/Footer.tsx` or `src/views/shared/Footer.html`.
* **Result:** You locate the specific `<a>` tag or icon component that handles the redirection.

### 4. The Environment Layer (The Damper)
Experienced brains check the **Environmental Layer** to see if the contact info is sensitive or environment-specific.
* **The Logic:** "Maybe this link changes between 'Development' and 'Production' modes."
* **Action:** You check the root directory for `.env` files or `.env.local`.
* **Result:** You find a variable like `NEXT_PUBLIC_GITHUB_URL=...`.

---

### Summary Table: How the Brain Filters the Search

| Cognitive Step | Mental Question | Search Target | Typical File |
| :--- | :--- | :--- | :--- |
| **Direct Search** | "What does the text say?" | `"github.com"` | Any file |
| **Logic Search** | "Where is the data stored?" | `config` / `site` | `config.js` |
| **Visual Search** | "Where is it on the screen?" | `Footer` / `Navbar` | `Footer.tsx` |
| **System Search** | "Is it an environment variable?" | `GITHUB` | `.env` |

### The "Hidden Pattern"
The brain avoids **Cognitive Load** by ignoring the "Functional Logic" (the code that makes the site work) and focusing only on "Static Assets" or "Constants." By treating the GitHub link as a **Data Node** rather than a piece of code, you can find it in seconds without understanding the entire project's mechanics.
