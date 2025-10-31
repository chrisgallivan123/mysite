# n8n Workflow Fixes

## Issue Summary
1. **Blogger.json**: `post_blog` tool has hardcoded MDX instead of using AI output
2. **POSTBLOG-2.json**: Duplicate/incomplete code node causing errors

## Fix 1: Blogger.json - Pass AI Output to POSTBLOG

**Problem**: Line 352 has a hardcoded MDX example string instead of using the AI's generated content.

**Solution**: Update the `post_blog` tool mapping to capture the AI's output:

1. **Update the tool description** (line 341) to be more explicit:
   ```
   "description": "Post blog using mdx format. Pass the complete MDX file content (including frontmatter) as the input_schema parameter."
   ```

2. **Update the mapping** (line 352) from:
   ```json
   "input_schema": "--- title: \"...\" [hardcoded string]"
   ```
   
   To one of these options:

   **Option A** (if AI passes as tool parameter):
   ```json
   "input_schema": "={{ $fromAI('post_blog') || $json.text || $json.output }}"
   ```

   **Option B** (if AI outputs MDX in response):
   ```json
   "input_schema": "={{ $json.output || $json.text || $json.content }}"
   ```

   **Option C** (if AI uses a specific field):
   ```json
   "input_schema": "={{ $json.mdx || $json.mdContent || $json.fileContent }}"
   ```

3. **Test**: Run a test where the AI generates a blog post and calls `post_blog`. Check the execution data to see what field contains the MDX output, then use that field.

## Fix 2: POSTBLOG-2.json - Remove Duplicate Node

**Problem**: There are two code nodes trying to extract title/slug:
- "Extract Title and Slug (MDX)" (line 104, incomplete - ends with `*`)
- "Code in JavaScript" (line 91, complete)

**Solution**: 
1. **Delete** the "Extract Title and Slug (MDX)" node (id: `6e05284a-3eee-4b45-b3c4-d5342c9c46d8`)
2. **Update connections** to route Guard → "Code in JavaScript" → Create file

**Updated connections should be**:
```json
"Guard": {
  "main": [[
    { "node": "Code in JavaScript", "type": "main", "index": 0 }
  ]]
},
"Code in JavaScript": {
  "main": [[
    { "node": "Create a file", "type": "main", "index": 0 }
  ]]
}
```

## How to Test

1. **Import the fixed workflows** into n8n
2. **Send a Telegram message** like: "Write a blog post about [topic]"
3. **Let the AI generate** the post and call `post_blog` tool
4. **Check execution logs** to see:
   - What data is passed to POSTBLOG workflow
   - If the GitHub file creation succeeds
   - Any error messages

## Expected Flow

1. Telegram message → AI Agent
2. AI generates blog post (MDX format)
3. AI calls `post_blog` tool with MDX content
4. POSTBLOG workflow receives `input_schema`
5. Guard validates the input
6. Code extracts title/slug from MDX
7. GitHub node creates/updates file in repo

## Debugging Tips

- Check execution data in each node to see what data is flowing through
- The `input_schema` field should contain the full MDX file content
- GitHub node needs proper credentials and file path format: `content/posts/{slug}.mdx`
- If file already exists, GitHub will update it; if new, it creates it

