import React, { useEffect, useRef, useState } from 'react';
import { SALESFORCE_SCHEMA, NETSUITE_SCHEMA, UNIFIED_SCHEMA, MAPPINGS } from '../constants.ts';
import { MappingObject } from '../types.ts';

interface Position { top: number; left: number; right: number; bottom: number; }
type ElementPositions = { [key: string]: Position | null };

const MappingColumn: React.FC<{ title: string; schema: MappingObject[]; setPositions: React.Dispatch<React.SetStateAction<ElementPositions>>; color: string }> = ({ title, schema, setPositions, color }) => {
    return (
        <div className="w-1/3 bg-white rounded-lg shadow-md p-4 space-y-4 overflow-y-auto">
            <h3 className={`text-lg font-bold text-center ${color}`}>{title}</h3>
            {schema.map(obj => (
                <div key={obj.id} className="bg-gray-50 rounded-md p-3">
                    <h4 className="font-semibold text-gray-700">{obj.name}</h4>
                    <div className="mt-2 space-y-2">
                        {obj.fields.map(field => {
                            const ref = useRef<HTMLDivElement>(null);
                            useEffect(() => {
                                if(ref.current) {
                                    const rect = ref.current.getBoundingClientRect();
                                    const parentRect = ref.current.closest('.relative')?.getBoundingClientRect();
                                    if(parentRect) {
                                        setPositions(prev => ({ ...prev, [field.id]: {
                                            top: rect.top - parentRect.top,
                                            left: rect.left - parentRect.left,
                                            right: rect.right - parentRect.left,
                                            bottom: rect.bottom - parentRect.top,
                                        }}));
                                    }
                                }
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            }, [field.id]);

                            return (
                                <div ref={ref} key={field.id} id={field.id} className="bg-white p-2 rounded border border-gray-200 text-sm text-gray-600">
                                    {field.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};


const MappingStudio: React.FC = () => {
    const [positions, setPositions] = useState<ElementPositions>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const lineColor = '#4A5568';

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Data Mapping Studio</h2>
            <div ref={containerRef} className="relative flex space-x-4 h-[70vh] bg-gray-100 p-4 rounded-lg">
                <MappingColumn title="Salesforce" schema={SALESFORCE_SCHEMA} setPositions={setPositions} color="text-blue-500" />
                <MappingColumn title="Unified Model" schema={UNIFIED_SCHEMA} setPositions={setPositions} color="text-green-500" />
                <MappingColumn title="NetSuite" schema={NETSUITE_SCHEMA} setPositions={setPositions} color="text-purple-500" />
                
                <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    {MAPPINGS.map(({ from, to }, index) => {
                        const fromPos = positions[from];
                        const toPos = positions[to];
                        if (fromPos && toPos) {
                            const isLeftToMiddle = from.startsWith('sf_');
                            const startX = isLeftToMiddle ? fromPos.right : fromPos.left;
                            const startY = fromPos.top + (fromPos.bottom - fromPos.top) / 2;
                            const endX = isLeftToMiddle ? toPos.left : toPos.right;
                            const endY = toPos.top + (toPos.bottom - toPos.top) / 2;
                            
                            const controlX1 = startX + (endX - startX) / 2;
                            const controlY1 = startY;
                            const controlX2 = endX - (endX - startX) / 2;
                            const controlY2 = endY;

                            return (
                                <path 
                                    key={index}
                                    d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                                    stroke={lineColor}
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                />
                            );
                        }
                        return null;
                    })}
                </svg>
            </div>
        </div>
    );
};

export default MappingStudio;