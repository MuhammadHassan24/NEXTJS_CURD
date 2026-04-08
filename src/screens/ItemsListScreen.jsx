"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Plus, Trash2, Edit2, ArrowLeft } from "lucide-react";

export const ItemsListScreen = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDelete = (id) => {
    // API call would go here
    console.log("Delete item:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-2"
              >
                <ArrowLeft size={18} />
                Back
              </Link>
              <Text
                as="h1"
                fontSize="2xl"
                fontWeight="bold"
                className="text-gray-900"
              >
                Items
              </Text>
            </div>
            <Link href="/items/create">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus size={18} />
                Add Item
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        {/* Items Table */}
        {filteredItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.description || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {item.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/items/${item.id}/edit`}>
                        <Button className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded transition-colors">
                          <Edit2 size={16} />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Text as="p" className="text-gray-600 mb-4">
              {searchTerm ? "No items match your search." : "No items yet."}
            </Text>
            <Link href="/items/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Create First Item
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
