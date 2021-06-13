import { html, css, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'

@customElement('bro-nav')
export default class BroNav extends LitElement {
  @query('ul')
  private linksContainer: HTMLUListElement | undefined

  @query('slot[name=links-drawer]')
  private linksDrawer: HTMLSlotElement | undefined;

  private linksContainerVisible = false

  static styles = css`
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

      @media screen and (min-width:768px){
        slot[name='links-drawer'] {
          display: none;
        }

        ul{
          position: initial;
          flex-direction: row;
          opacity: 1;
          transform: initial;
          justify-content: space-between;
          width: initial;
          z-index: initial;
          padding: 0;

        }
      }
    `

  render () {
    return html`
      <slot name="logo"></slot>
      <ul part="links">
        <slot name="link"></slot>
      </ul>
      <slot @click=${this.toggleLinksDrawer} name="links-drawer"></slot>
    `
  }

  firstUpdated () {
    const links = (this.shadowRoot?.querySelector('slot[name=link]') as HTMLSlotElement).assignedElements()

    links.forEach(link => {
      const li = document.createElement('li')
      li.slot = 'link'
      link.removeAttribute('slot')
      this.insertBefore(li, link)
      li.appendChild(link)
    })
  }

  private toggleLinksDrawer () {
    if (this.linksContainer) {
      if (this.linksContainerVisible) {
        this.linksContainer.style.transform = 'translateY(-100%)'
        this.linksContainer.style.opacity = '0'
      } else {
        this.linksContainer.style.transform = 'translateY(0)'
        this.linksContainer.style.opacity = '1'
      }
      this.linksContainerVisible = !this.linksContainerVisible
    }
  }
}
