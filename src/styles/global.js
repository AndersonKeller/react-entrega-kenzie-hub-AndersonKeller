import { createGlobalStyle } from "styled-components";

export const GLobalStyles = createGlobalStyle`
    :root{
        --color-primary: #FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-negative: #59323F;

        --color-gray4: #121214;
        --color-gray3: #212529;
        --color-gray2:#343B41;
        --color-gray1: #868E96;
        --color-gray0: #F8F9FA;

        --color-sucess: #3FE864;
        --color-negative: #E83F5B;
        
        --font-title1: 1.125rem;
        --font-title2: 1rem;
        --font-title3:  0.875rem;
        --font-text: 0.75rem;
    }
    *{
        list-style: none;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Inter', sans-serif;
        background-color: #000;
        padding: 0 0.5rem;
        width: 320px;
        margin: 0 auto;
    }
    button,a{
        cursor: pointer;
        font-size: var(--font-title2);
        border-radius: 4px;
        font-weight: 500;
        line-height: 26px;
        border: none;
        padding: 0.5rem 1rem;
        text-decoration: none;
    }
    a:hover{
        background-color: var(--color-gray2);
    }

@media (min-width: 750px) {
    body{
        width: 600px;
        transition: 1s ease;
    }
}
@media (max-width: 749px) {
    body{
        transition: 1s ease;
    }
    
}
`;
