import { osintTools } from './osint-tools.js';

function loadOSINTTools() {
  const content = document.getElementById('osintContent');
  if (!content) return;

  const categories = [...new Set(osintTools.map(t => t.category))];
  
  categories.forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'osint-category';
    
    const categoryTitle = document.createElement('h4');
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);
    
    const tools = osintTools.filter(t => t.category === category);
    
    tools.forEach(tool => {
      const toolLink = document.createElement('a');
      toolLink.href = tool.url;
      toolLink.target = '_blank';
      toolLink.rel = 'noopener noreferrer';
      toolLink.className = 'osint-tool';
      toolLink.innerHTML = `
        <span class="tool-icon">${tool.icon}</span>
        <span class="tool-name">${tool.name}</span>
      `;
      
      toolLink.addEventListener('mouseenter', (e) => {
        showOSINTTooltip(e, tool);
      });
      
      toolLink.addEventListener('mouseleave', () => {
        hideOSINTTooltip();
      });
      
      categorySection.appendChild(toolLink);
    });
    
    content.appendChild(categorySection);
  });
}

function showOSINTTooltip(event, tool) {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;
  
  tooltip.innerHTML = `
    <h4>${tool.icon} ${tool.name}</h4>
    <p>${tool.description}</p>
    <small>Click to open in new tab</small>
  `;
  
  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = `${rect.left - 320}px`;
  tooltip.style.top = `${rect.top}px`;
  tooltip.classList.add('show');
}

function hideOSINTTooltip() {
  const tooltip = document.getElementById('tooltip');
  if (tooltip) {
    tooltip.classList.remove('show');
  }
}

// Toggle panel
document.addEventListener('DOMContentLoaded', () => {
  loadOSINTTools();
  
  const toggle = document.getElementById('osintToggle');
  const panel = document.getElementById('osintPanel');
  
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      toggle.textContent = panel.classList.contains('collapsed') ? '▶' : '◀';
    });
  }
});
