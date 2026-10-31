
const menuButton = document.getElementById("menu-toggle");
const tabMenu = document.getElementById("tab-menu");

const tabs = Array.from(
    document.querySelectorAll('[role="tab"]')
);

const panels = Array.from(
    document.querySelectorAll('[role="tabpanel"]')
);

menuButton.addEventListener("click", function () {
    const isOpen = tabMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});


function activateTab(selectedTab) {
    tabs.forEach(function (tab) {
        const isActive = tab === selectedTab;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", isActive);
        tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(function (panel) {
        panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
    });

    tabMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
}

tabMenu.addEventListener("click", function (event) {
    const clickedTab = event.target.closest('[role="tab"]');

    if (!clickedTab || !tabMenu.contains(clickedTab)) {
        return;
    }

    activateTab(clickedTab);
});

tabMenu.addEventListener("keydown", function (event) {
    const currentTab = event.target.closest('[role="tab"]');

    if (!currentTab) {
        return;
    }

    const currentIndex = tabs.indexOf(currentTab);
    let nextIndex;

    if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
        return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];
    activateTab(nextTab);
    nextTab.focus();
});
