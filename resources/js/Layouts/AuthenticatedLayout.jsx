import { useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import VerticalLayout from "@/Layouts/VerticalLayout";
import {
    Menu,
    Bell,
    CheckCheck,
    Package,
    ShoppingCart,
    Truck,
    Wallet,
    AlertTriangle,
    X,
} from "lucide-react";

const notificationIcon = (icon) => {
    const icons = {
        Bell,
        Package,
        ShoppingCart,
        Truck,
        Wallet,
        AlertTriangle,
    };

    return icons[icon] || Bell;
};

const notificationColor = (type) => {
    const colors = {
        success:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        warning:
            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        danger:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        info:
            "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    };

    return colors[type] || colors.info;
};

export default function AuthenticatedLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const { props } = usePage();

    const user = props.auth.user;
    const notifications = props.notifications || {
        unread_count: 0,
        items: [],
    };

    const unreadCount = Number(notifications.unread_count || 0);
    const items = notifications.items || [];

    const displayName = useMemo(() => {
        return user?.name || "Utilisateur";
    }, [user]);

    const openNotification = (notification) => {
        router.post(
            route("notifications.read", notification.id),
            {},
            {
                preserveScroll: true,
                preserveState: false,
            }
        );
    };

    const markAllAsRead = () => {
        router.post(
            route("notifications.read-all"),
            {},
            {
                preserveScroll: true,
                preserveState: false,
            }
        );
    };

    const deleteNotification = (e, notification) => {
        e.stopPropagation();

        router.delete(route("notifications.destroy", notification.id), {
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <div className="h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
            <VerticalLayout
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            >
                <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                    <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex w-full items-center justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(true)}
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>

                                <div className="min-w-0">
                                    <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl lg:text-2xl">
                                        Bonjour, {displayName}
                                    </h1>

                                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                                        Bienvenue dans votre espace
                                        d'administration
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setNotificationsOpen(
                                            (current) => !current
                                        )
                                    }
                                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <Bell className="h-5 w-5" />

                                    {unreadCount > 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                                            {unreadCount > 9 ? "9+" : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {notificationsOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setNotificationsOpen(false)
                                            }
                                        />

                                        <div className="absolute right-0 top-14 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                                            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
                                                <div>
                                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                                        Notifications
                                                    </h2>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {unreadCount} non lue(s)
                                                    </p>
                                                </div>

                                                {unreadCount > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={markAllAsRead}
                                                        className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:text-cyan-300 dark:hover:bg-cyan-900/20"
                                                    >
                                                        <CheckCheck className="h-4 w-4" />
                                                        Tout lire
                                                    </button>
                                                )}
                                            </div>

                                            <div className="max-h-[440px] overflow-y-auto">
                                                {items.length > 0 ? (
                                                    items.map((notification) => {
                                                        const Icon =
                                                            notificationIcon(
                                                                notification.icon
                                                            );

                                                        return (
                                                            <button
                                                                key={
                                                                    notification.id
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    openNotification(
                                                                        notification
                                                                    )
                                                                }
                                                                className={`group flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70 ${
                                                                    !notification.is_read
                                                                        ? "bg-cyan-50/70 dark:bg-cyan-900/10"
                                                                        : "bg-white dark:bg-slate-900"
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${notificationColor(
                                                                        notification.type
                                                                    )}`}
                                                                >
                                                                    <Icon className="h-5 w-5" />
                                                                </div>

                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <h3 className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">
                                                                            {
                                                                                notification.title
                                                                            }
                                                                        </h3>

                                                                        {!notification.is_read && (
                                                                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-600" />
                                                                        )}
                                                                    </div>

                                                                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                                                                        {
                                                                            notification.message
                                                                        }
                                                                    </p>

                                                                    <p className="mt-2 text-xs font-medium text-slate-400">
                                                                        {
                                                                            notification.created_at
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <span
                                                                    onClick={(e) =>
                                                                        deleteNotification(
                                                                            e,
                                                                            notification
                                                                        )
                                                                    }
                                                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </span>
                                                            </button>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="px-6 py-10 text-center">
                                                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                                                            <Bell className="h-7 w-7" />
                                                        </div>

                                                        <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                                                            Aucune notification
                                                        </h3>

                                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                            Les nouvelles activités
                                                            apparaîtront ici.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </VerticalLayout>
        </div>
    );
}