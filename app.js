document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".mm");

    const updateMenuHeight = (activeMenu) => {
        const height = activeMenu.scrollHeight;
        menu.style.setProperty("--mmHeight", `${height}px`);
    };

    const setActiveMenu = (newActiveMenu) => {
        const currentActiveMenu = menu.querySelector(".active-menu");
        if (currentActiveMenu) {
            currentActiveMenu.classList.remove("active-menu");
        }
        newActiveMenu.classList.add("active-menu");
        setTimeout(() => updateMenuHeight(newActiveMenu), 0);
    };

    window.addEventListener('load', () => {
        const initialMenu = document.querySelector(".menu-level");
        setActiveMenu(initialMenu);
    });

    menu.addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-item")) {
            const targetMenu = document.getElementById(e.target.dataset.target);
            const parentMenu = e.target.closest(".menu-level");

            if (targetMenu && parentMenu) {
                targetMenu.style.transform = "translateX(0)";
                parentMenu.style.transform = "translateX(-100%)";

                const title = e.target.textContent.replace(" →", "");
                const header = targetMenu.querySelector(".menu-header .menu-title");
                if (header) {
                    header.textContent = title;
                }
                targetMenu.dataset.previous = parentMenu.id;
                setActiveMenu(targetMenu);
            }
        }

        if (e.target.classList.contains("back-button")) {
            const currentMenu = e.target.closest(".menu-level");
            const previousMenuId = currentMenu.dataset.previous;
            const previousMenu = document.getElementById(previousMenuId);

            if (currentMenu && previousMenu) {
                currentMenu.style.transform = "translateX(100%)";
                previousMenu.style.transform = "translateX(0)";
                setActiveMenu(previousMenu);
            }
        }
    });
});
