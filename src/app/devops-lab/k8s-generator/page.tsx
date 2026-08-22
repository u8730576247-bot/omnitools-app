'use client';

import React, { useState, useMemo } from 'react';
import ToolLayout from '@/components/killkit/ToolLayout';
import { Box, Copy, Check } from 'lucide-react';

export default function K8sGeneratorPage() {
  const [appName, setAppName] = useState('my-app');
  const [image, setImage] = useState('nginx:alpine');
  const [replicas, setReplicas] = useState('2');
  const [port, setPort] = useState('80');
  const [resourceType, setResourceType] = useState<'deployment' | 'service' | 'both'>('both');
  const [copied, setCopied] = useState(false);

  const generatedYaml = useMemo(() => {
    const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName || 'my-app'}-deployment
  labels:
    app: ${appName || 'my-app'}
spec:
  replicas: ${parseInt(replicas) || 1}
  selector:
    matchLabels:
      app: ${appName || 'my-app'}
  template:
    metadata:
      labels:
        app: ${appName || 'my-app'}
    spec:
      containers:
      - name: ${appName || 'my-app'}
        image: ${image || 'nginx:alpine'}
        ports:
        - containerPort: ${parseInt(port) || 80}`;

    const serviceYaml = `apiVersion: v1
kind: Service
metadata:
  name: ${appName || 'my-app'}-service
spec:
  type: ClusterIP
  selector:
    app: ${appName || 'my-app'}
  ports:
  - port: ${parseInt(port) || 80}
    targetPort: ${parseInt(port) || 80}`;

    if (resourceType === 'deployment') return deploymentYaml;
    if (resourceType === 'service') return serviceYaml;
    return `${deploymentYaml}\n---\n${serviceYaml}`;
  }, [appName, image, replicas, port, resourceType]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Kubernetes YAML Resource Generator"
      badge="DEVOPS CLUSTER"
      description="Generate standard Kubernetes Deployment, Service, and configuration manifests for cluster workloads."
      icon={Box}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Controls Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Application / Resource Name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Container Image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Replicas</label>
            <input
              type="text"
              value={replicas}
              onChange={(e) => setReplicas(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Container Port</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono text-slate-400">Resource Type</label>
            <div className="flex gap-2">
              {(['both', 'deployment', 'service'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setResourceType(type)}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    resourceType === type
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
              Generated Kubernetes Manifest
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy YAML'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={generatedYaml}
            className="w-full h-80 p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 text-xs font-mono focus:outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </ToolLayout>
  );
}