import { LitElement, html, css} from 'lit-element';
import { milligram as milligram } from './milligram';
import { initCss as initCss } from './init-css';
import './components/blog-post'
import './components/markdown-intro'
import './components/posts-menu'

class MainApp extends LitElement {
  static styles = [milligram, initCss]

  constructor() {
    super();
  }

  render() {
    return html`
      
    <section class="container">
      <div class="row">
        <markdown-intro></markdown-intro>
      </div>
      
      </div>
      <div class="row">
        <div class="column column-25">
          <!-- List of posts -->
          <posts-menu></posts-menu>
        </div>
        <div class="column column-75">
          <!-- post content -->
          <blog-post></blog-post>
        </div>

      </div>
    </section>    
    `;
  }
}

customElements.define('main-app', MainApp);
