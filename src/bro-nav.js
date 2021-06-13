import { LitElement, html, css } from 'lit'

export default class BroNav extends LitElement {
  linksDrawer = null
  linksContainer = null
  linksContainerVisible = false

  static get styles () {
    return css`
      :host {
        background-color: black;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8vh;
        position: sticky;
      }
      slot[name='logo'] {
        display: flex;
        align-items: center;
        vertical-align: bottom;
      }

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 0;
        padding-top: 1rem;
        padding-bottom: 1rem;
        gap: 1rem;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: black;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: ease;

        transform: translateY(-100%);
        opacity: 0;
        z-index: -1;
      }

      ::slotted(li) {
        list-style: none;
      }
    `
  }

  render () {
    return html`
      <slot name="logo"></slot>
      <ul part="links">
        <slot name="link"></slot>
      </ul>
      <slot name="links-drawer"></slot>
    `
  }

  firstUpdated () {
    this.linksDrawer = this.shadowRoot.querySelector('slot[name=links-drawer]')
    this.linksDrawer.addEventListener('click', () => {
      this.toggleLinksDrawer()
    })
    this.linksContainer = this.shadowRoot.querySelector('ul')

    const links = this.shadowRoot
      .querySelector('slot[name=link]')
      .assignedElements()

    links.forEach(link => {
      const li = document.createElement('li')
      li.slot = 'link'
      link.removeAttribute('slot')
      this.insertBefore(li, link)
      li.appendChild(link)
    })
  }

  toggleLinksDrawer () {
    if (this.linksContainerVisible) {
      this.linksContainer.style.transform = 'translateY(-100%)'
      this.linksContainer.style.opacity = 0
    } else {
      this.linksContainer.style.transform = 'translateY(0)'
      this.linksContainer.style.opacity = 1
    }
    this.linksContainerVisible = !this.linksContainerVisible
  }
}

window.customElements.define('bro-nav', BroNav)
